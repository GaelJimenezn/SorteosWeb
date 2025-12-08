import { supabase } from './supabase.js';

export const getBoletosBySorteo = async (sorteoId) => {
    const { data, error } = await supabase
        .from('boletos')
        .select('numero, estado') // Minimal data for grid
        .eq('sorteo_id', sorteoId);

    if (error) return [];
    return data;
};

export const reservarBoleto = async (numero, sorteoId, userId, clienteInfo) => {
    // Check availability first just in case
    const { data: check } = await supabase
        .from('boletos')
        .select('estado')
        .eq('sorteo_id', sorteoId)
        .eq('numero', numero)
        .single();

    if (check && check.estado !== 'disponible') return { success: false, message: 'Ocupado' };

    // Update
    const { error } = await supabase
        .from('boletos')
        .update({
            estado: 'proceso',
            user_id: userId,
            cliente_info: clienteInfo
        })
        .eq('sorteo_id', sorteoId)
        .eq('numero', numero);

    if (error) return { success: false, message: error.message };
    return { success: true };
};

export const getUserBoletos = async (userId) => {
    const { data, error } = await supabase
        .from('boletos')
        .select('*, sorteos(titulo, fecha)')
        .eq('user_id', userId);

    if (error) return [];
    return data;
};
