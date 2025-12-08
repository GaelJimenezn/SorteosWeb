import Sidebar from './components/Sidebar.js';
import Dashboard from './pages/Dashboard.js';
import Sorteos from './pages/Sorteos.js';
import Validation from './pages/Validation.js';
import Roulette from './pages/Roulette.js';
import Winners from './pages/Winners.js';
import Settings from './pages/Settings.js';

const initAdmin = async () => {
    // 1. Auth Check (Mock) - TEMPORARILY DISABLED FOR REVIEW
    /*
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Acceso Denegado: Debes ser administrador');
        window.location.href = '../frontend/index.html';
        return;
    }
    */

    const app = document.getElementById('admin-app');

    // 2. Global State for Module Switching
    let currentModule = 'dashboard';

    const render = async () => {
        // Layout Skeleton
        app.innerHTML = `
            <div class="admin-wrapper">
                ${Sidebar(currentModule)}
                <main class="main-content">
                    <div id="module-content"></div>
                </main>
            </div>
        `;

        const contentContainer = document.getElementById('module-content');
        switch (currentModule) {
            case 'dashboard': contentContainer.innerHTML = Dashboard(); break;
            case 'sorteos': contentContainer.innerHTML = Sorteos(); break;
            case 'validation': contentContainer.innerHTML = Validation(); break;
            case 'roulette': contentContainer.innerHTML = Roulette(); break;
            case 'winners': contentContainer.innerHTML = Winners(); break;
            case 'settings': contentContainer.innerHTML = Settings(); break;
        }
    };

    // Expose Switch globally
    window.switchModule = (moduleId) => {
        currentModule = moduleId;
        render();
    };

    window.adminLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = '../frontend/index.html';
    };

    // Initial Render
    await render();
};

document.addEventListener('DOMContentLoaded', initAdmin);