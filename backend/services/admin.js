import { supabase } from './supabase.js';

// Helper para subir imagen
export const uploadImage = async (file) => {
    console.log(`🔵 [Storage] Subiendo imagen: ${file.name}`);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('sorteos-img')
        .upload(filePath, file);

    if (uploadError) {
        console.error('🔴 [Storage] Error subiendo imagen:', uploadError);
        throw uploadError;
    }

    const { data } = supabase.storage
        .from('sorteos-img')
        .getPublicUrl(filePath);

    console.log(`🟢 [Storage] Imagen subida: ${data.publicUrl}`);
    return data.publicUrl;
};

export const createSorteo = async (sorteoData, filePortada, filesGaleria = []) => {
    try {
        console.log("🔵 [Admin] Iniciando creación de sorteo...", sorteoData);

        // 1. Upload Portada
        let portadaUrl = null;
        if (filePortada) {
            portadaUrl = await uploadImage(filePortada);
        }

        // 2. Insert Sorteo
        const { data: newSorteo, error: insertError } = await supabase
            .from('sorteos')
            .insert([{ ...sorteoData, imagen_portada: portadaUrl, estado: 'activo' }])
            .select()
            .single();

        if (insertError) throw insertError;
        console.log("🟢 [Admin] Sorteo creado ID:", newSorteo.id);

        // 3. Upload & Insert Gallery
        if (filesGaleria && filesGaleria.length > 0) {
            console.log(`🔵 [Admin] Subiendo ${filesGaleria.length} imágenes de galería...`);
            for (let i = 0; i < filesGaleria.length; i++) {
                const file = filesGaleria[i];
                const url = await uploadImage(file);

                await supabase
                    .from('sorteo_galeria')
                    .insert([{ sorteo_id: newSorteo.id, imagen_url: url }]);
            }
        }

        console.log("🟢 [Admin] Proceso finalizado correctamente.");
        return true;
    } catch (error) {
        console.error('🔴 [Admin] Error crítico creando sorteo:', error);
        return false;
    }
};

// Estadísticas simples para el Dashboard
export const getGlobalStats = async () => {
    console.log("🔵 [Admin] Calculando estadísticas...");
    // Nota: count exacto puede ser lento en tablas gigantes, pero está bien aquí
    const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: pendingCount } = await supabase.from('boletos').select('*', { count: 'exact', head: true }).eq('estado', 'proceso');
    const { count: activeSorteos } = await supabase.from('sorteos').select('*', { count: 'exact', head: true }).eq('estado', 'activo');

    return {
        users: usersCount || 0,
        pending: pendingCount || 0,
        activeSorteos: activeSorteos || 0
    };
};