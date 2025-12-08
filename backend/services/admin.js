import { supabase } from './supabase.js';

export const getGlobalStats = async () => {
    // This might be expensive in real DB, consider dedicated stats table or Edge Function
    const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    // Aggregations are tricky client-side, returning mock/simple counts for now or specific queries

    const { count: pendingCount } = await supabase.from('boletos').select('*', { count: 'exact', head: true }).eq('estado', 'proceso');

    return {
        users: usersCount || 0,
        pending: pendingCount || 0,
        salesToday: 0 // Needs complex query
    };
};

export const getPendingBoletos = async () => {
    const { data, error } = await supabase
        .from('boletos')
        .select('*')
        .eq('estado', 'proceso');

    if (error) return [];
    return data;
};

export const validateBoletoAdmin = async (id) => {
    const { error } = await supabase
        .from('boletos')
        .update({ estado: 'confirmado' })
        .eq('id', id); // Using ID is safer than number for DB operations

    return !error;
};

export const rejectBoletoAdmin = async (id) => {
    const { error } = await supabase
        .from('boletos')
        .update({ estado: 'disponible', user_id: null, cliente_info: null })
        .eq('id', id);

    return !error;
};

// Helper to upload image
export const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('sorteos-img')
        .upload(filePath, file);

    if (uploadError) {
        console.error('Error subiendo imagen:', uploadError);
        throw uploadError;
    }

    const { data } = supabase.storage
        .from('sorteos-img')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

export const createSorteo = async (sorteoData, filePortada, filesGaleria = []) => {
    try {
        // 1. Upload Portada
        let portadaUrl = null;
        if (filePortada) {
            portadaUrl = await uploadImage(filePortada);
        }

        // 2. Insert Sorteo
        const { data: newSorteo, error: insertError } = await supabase
            .from('sorteos')
            .insert([{ ...sorteoData, imagen: portadaUrl, estado: 'activo' }])
            .select()
            .single();

        if (insertError) throw insertError;

        // 3. Upload & Insert Gallery
        if (filesGaleria && filesGaleria.length > 0) {
            for (let i = 0; i < filesGaleria.length; i++) {
                const file = filesGaleria[i];
                const url = await uploadImage(file);

                await supabase
                    .from('sorteo_galeria')
                    .insert([{ sorteo_id: newSorteo.id, imagen_url: url }]);
            }
        }

        return true;
    } catch (error) {
        console.error('Error creando sorteo:', error);
        return false;
    }
};
