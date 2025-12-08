import { supabase } from './supabase.js';

export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Fetch profile for additional data like role
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();

    return { ...data.user, ...profile };
};

export const register = async (email, password, nombre, telefono) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    if (data.user) {
        // Create Profile linked to Auth User
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ id: data.user.id, nombre, telefono, role: 'user' }]);

        if (profileError) console.error('Error creando perfil:', profileError);
    }

    return data;
};

export const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('currentUser');
};

export const getCurrentUser = async () => {
    const session = await supabase.auth.getSession();
    if (!session.data.session) return null;

    // Potentially re-fetch profile if needed, or rely on local storage for speed
    // For now, simpler:
    return JSON.parse(localStorage.getItem('currentUser'));
};
