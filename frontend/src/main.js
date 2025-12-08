import Home from './pages/Home.js';
import SorteosPage from './pages/SorteosPage.js';
import ContactPage from './pages/ContactPage.js';

const routes = {
    '/': Home,
    '/sorteos': SorteosPage,
    '/contacto': ContactPage,
    '/contacto': ContactPage,
    '/terminos': () => import('./pages/TermsPage.js').then(m => m.default()),
    '/privacidad': () => import('./pages/PrivacyPage.js').then(m => m.default()),
    '/reembolsos': () => import('./pages/RefundsPage.js').then(m => m.default())
};

const router = async () => {
    const app = document.getElementById('app');
    const hash = location.hash.slice(1) || '/';

    // Rutas estáticas
    if (routes[hash]) {
        app.innerHTML = await routes[hash]();
    }
    // Ruta dinámica para detalle de sorteo
    else if (hash.startsWith('/sorteo/')) {
        const id = hash.split('/')[2];
        const { default: RaffleDetailPage } = await import('./pages/RaffleDetailPage.js');
        app.innerHTML = await RaffleDetailPage(id);
    }
    // Ruta dinámica para ganadores (highlight)
    else if (hash.startsWith('/ganadores')) {
        const parts = hash.split('/');
        const highlightId = parts.length > 2 ? parts[2] : null;
        const { default: WinnersPage } = await import('./pages/WinnersPage.js');
        app.innerHTML = await WinnersPage(highlightId);
        // El componente se encarga del scroll
        return;
    }
    // Ruta para Historia y Valores
    else if (hash === '/nosotros') {
        app.innerHTML = await Home();
        setTimeout(() => {
            const el = document.getElementById('about-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
    }
    // Ruta para FAQ
    else if (hash === '/faq') {
        app.innerHTML = await Home();
        setTimeout(() => {
            const el = document.getElementById('faq-contact-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
    }
    // 404 / Default
    else {
        app.innerHTML = await Home();
    }

    if (hash !== '/nosotros' && hash !== '/faq' && !hash.startsWith('/ganadores')) {
        window.scrollTo(0, 0);
    }
};

const init = () => {
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
};

document.addEventListener('DOMContentLoaded', init);