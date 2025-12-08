import { supabase } from './supabase.js';

export const login = async (email, password) => {
    console.log(`🔵 [Auth] Intentando iniciar sesión para: ${email}`);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.error("🔴 [Auth] Error en login:", error.message);
        throw error;
    }

    console.log("🟢 [Auth] Login correcto. Obteniendo perfil...");
    // Fetch profile for additional data like role
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

    if (profileError) {
        console.warn("TB [Auth] No se pudo cargar el perfil extra (quizás es el primer login):", profileError.message);
    } else {
        console.log("🟢 [Auth] Perfil cargado:", profile);
    }

    return { ...data.user, ...profile };
};

export const register = async (email, password, nombre, telefono) => {
    console.log(`🔵 [Auth] Registrando nuevo usuario: ${email}`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                nombre: nombre,
                telefono: telefono
            }
        }
    });

    if (error) {
        console.error("🔴 [Auth] Error en registro:", error.message);
        throw error;
    }

    console.log("🟢 [Auth] Usuario registrado en Auth. El Trigger SQL debería crear el perfil ahora.");
    return data;
};

export const logout = async () => {
    console.log("🔵 [Auth] Cerrando sesión...");
    await supabase.auth.signOut();
    localStorage.removeItem('currentUser');
    console.log("🟢 [Auth] Sesión cerrada.");
};

export const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) console.log("ℹ️ [Auth] Usuario actual en caché:", user.email);
    return user;
};