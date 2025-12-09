import Sidebar from './components/Sidebar.js';
import Dashboard from './pages/Dashboard.js';
import Sorteos from './pages/Sorteos.js';
import Validation from './pages/Validation.js';
import Roulette from './pages/Roulette.js';
import Winners from './pages/Winners.js';
import Settings from './pages/Settings.js';
import Login from './pages/Login.js';
import { supabase } from '../../backend/services/supabase.js'; // Necesario para la verificación de sesión en vivo

const initAdmin = async () => {
    const app = document.getElementById('admin-app');

    // 🔍 VERIFICACIÓN DE SEGURIDAD SERVER-SIDE 🔍

    // 1. Obtener sesión activa
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;
    let isAdmin = false;
    let profileData = null;

    if (session) {
        // 2. Si hay sesión VÁLIDA, verificamos el rol en la DB.
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, nombre')
            .eq('id', session.user.id)
            .single();

        if (profile && profile.role === 'admin') {
            isAdmin = true;
            profileData = profile;
        }

        // 3. Actualizar el localStorage si es admin
        if (profileData) {
            localStorage.setItem('currentUser', JSON.stringify({
                id: session.user.id,
                role: profileData.role,
                nombre: profileData.nombre
            }));
        }

        // Si hay sesión pero NO es admin
        if (!isAdmin) {
            console.warn("Usuario logueado pero sin permisos de admin");
            await supabase.auth.signOut(); // Cerramos la sesión inválida
            // Fallthrough a mostrar login
        }
    }

    // --- DECISIÓN DE RENDERIZADO ---

    // CASO 1: NO ES ADMIN (O NO LOGUEADO) -> MOSTRAR LOGIN
    if (!isAdmin) {
        app.innerHTML = Login();
        return;
    }

    // CASO 2: ES ADMIN -> CARGAR APLICACIÓN PRINCIPAL
    let currentModule = 'dashboard';

    const render = async () => {
        app.innerHTML = `
            <div class="admin-wrapper">
                ${Sidebar(currentModule)}
                <main class="main-content">
                    <div id="module-content" style="display: flex; justify-content: center; align-items: center; min-height: 200px;">
                        Cargando...
                    </div>
                </main>
            </div>
        `;

        const contentContainer = document.getElementById('module-content');

        let html = '';
        switch (currentModule) {
            case 'dashboard': html = await Dashboard(); break;
            case 'sorteos': html = await Sorteos(); break;
            case 'validation': html = await Validation(); break;
            case 'roulette': html = await Roulette(); break;
            case 'winners': html = await Winners(); break;
            case 'settings': html = Settings(); break;
        }

        contentContainer.style.display = 'block';
        contentContainer.innerHTML = html;
    };

    window.switchModule = (moduleId) => {
        currentModule = moduleId;
        render();
    };

    window.adminLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('currentUser');
        window.location.reload(); // Recargar para mostrar el login de nuevo
    };

    await render();
};

document.addEventListener('DOMContentLoaded', initAdmin);