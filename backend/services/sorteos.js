import { supabase } from './supabase.js';

export const getActiveSorteos = async () => {
    const { data, error } = await supabase
        .from('sorteos')
        .select('*')
        .eq('estado', 'activo');

    if (error) {
        console.error(error);
        return [];
    }
    return data;
};

export const getPastSorteos = async () => {
    const { data, error } = await supabase
        .from('sorteos')
        .select('*')
        .eq('estado', 'finalizado');

    if (error) {
        console.error(error);
        return [];
    }
    return data;
};

export const getSorteoById = async (id) => {
    const { data, error } = await supabase
        .from('sorteos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;
    return data;
};
