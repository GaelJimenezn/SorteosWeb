import { supabase } from './supabase.js';

export const getBoletosBySorteo = async (sorteoId) => {
    console.log(`🔵 [Boletos] Cargando boletos para sorteo ${sorteoId}...`);
    const { data, error } = await supabase
        .from('boletos')
        .select('numero, estado')
        .eq('sorteo_id', sorteoId)
        .order('numero', { ascending: true });

    if (error) {
        console.error("🔴 [Boletos] Error al cargar:", error.message);
        return [];
    }
    console.log(`🟢 [Boletos] ${data.length} boletos cargados.`);
    return data;
};

export const reservarBoleto = async (numero, sorteoId, userId, clienteInfo) => {
    console.log(`🔵 [Boletos] Intentando reservar boleto #${numero} para usuario ${userId || 'Anonimo'}`);

    // Check de seguridad (opcional, RLS lo hace, pero ahorra una llamada fallida)
    /*
    const { data: check } = await supabase
        .from('boletos')
        .select('estado')
        .eq('sorteo_id', sorteoId)
        .eq('numero', numero)
        .single();

    if (check && check.estado !== 'disponible') {
        console.warn(`⚠️ [Boletos] El boleto ${numero} ya no está disponible.`);
        return { success: false, message: 'Ocupado' };
    }
    */

    const { data, error } = await supabase
        .from('boletos')
        .update({
            estado: 'proceso',
            user_id: userId || null,
            cliente_info: clienteInfo || null
        })
        .eq('sorteo_id', sorteoId)
        .eq('numero', numero)
        .eq('estado', 'disponible') // Candado optimista
        .select();

    if (error) {
        console.error("🔴 [Boletos] Error en reserva:", error.message);
        return { success: false, message: error.message };
    }

    if (!data || data.length === 0) {
        console.warn("⚠️ [Boletos] Falló la reserva (posiblemente alguien ganó el click).");
        return { success: false, message: 'El boleto ya no está disponible.' };
    }

    console.log(`🟢 [Boletos] Boleto ${numero} reservado con éxito.`);
    return { success: true };
};

export const getUserBoletos = async (userId) => {
    const { data, error } = await supabase
        .from('boletos')
        .select('*, sorteos(titulo, fecha_sorteo)')
        .eq('user_id', userId);

    if (error) return [];
    return data;
};