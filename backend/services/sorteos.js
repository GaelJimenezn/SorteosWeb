import { supabase } from './supabase.js';

export const getActiveSorteos = async () => {
    console.log("🔵 [Data] Buscando sorteos activos...");
    const { data, error } = await supabase
        .from('sorteos')
        .select('*')
        .eq('estado', 'activo')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("🔴 [Data] Error cargando sorteos:", error.message);
        return [];
    }

    console.log(`🟢 [Data] Se encontraron ${data.length} sorteos activos.`);
    return data;
};

export const getPastSorteos = async () => {
    console.log("🔵 [Data] Buscando sorteos pasados...");
    const { data, error } = await supabase
        .from('sorteos')
        .select('*')
        .eq('estado', 'finalizado')
        .order('fecha_sorteo', { ascending: false });

    if (error) {
        console.error("🔴 [Data] Error cargando historial:", error.message);
        return [];
    }
    return data;
};

export const getSorteoById = async (id) => {
    console.log(`🔵 [Data] Cargando detalle del sorteo ID: ${id}`);
    const { data: sorteo, error } = await supabase
        .from('sorteos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("🔴 [Data] Sorteo no encontrado:", error.message);
        return null;
    }

    // Cargar galería
    const { data: galeria } = await supabase
        .from('sorteo_galeria')
        .select('imagen_url')
        .eq('sorteo_id', id);

    console.log("🟢 [Data] Sorteo y galería cargados.");
    return {
        ...sorteo,
        galeria: galeria ? galeria.map(g => g.imagen_url) : []
    };
};