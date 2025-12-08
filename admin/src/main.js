import Sidebar from './components/Sidebar.js';
import Dashboard from './pages/Dashboard.js';
import Sorteos from './pages/Sorteos.js';
import Validation from './pages/Validation.js';
import Roulette from './pages/Roulette.js';
import Winners from './pages/Winners.js';
import Settings from './pages/Settings.js';

const initAdmin = async () => {
    // 1. Verificar si hay usuario logueado (Básico)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = '../frontend/index.html';
        return;
    }

    const app = document.getElementById('admin-app');
    let currentModule = 'dashboard';

    const render = async () => {
        // Estructura Base
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

        // 2. Cargar el módulo con AWAIT (Importante para Supabase)
        let html = '';
        switch (currentModule) {
            case 'dashboard': html = await Dashboard(); break;
            case 'sorteos': html = await Sorteos(); break;
            case 'validation': html = await Validation(); break;
            case 'roulette': html = await Roulette(); break;
            case 'winners': html = await Winners(); break;
            case 'settings': html = Settings(); break;
        }

        // Inyectar HTML limpio
        contentContainer.style.display = 'block'; // Quitar el centrado de "Cargando"
        contentContainer.innerHTML = html;
    };

    window.switchModule = (moduleId) => {
        currentModule = moduleId;
        render();
    };

    window.adminLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = '../frontend/index.html';
    };

    await render();
};

document.addEventListener('DOMContentLoaded', initAdmin);