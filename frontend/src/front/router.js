import Home from './pages/Home.js';

const routes = {
    '/': Home,
    '/ganadores': async () => `<h1>Próximamente</h1>`
};

export const router = async () => {
    const app = document.getElementById('app');
    // Fix para Live Server: Ignorar '/frontend' o '/index.html'
    let path = window.location.pathname.replace('/frontend', '').replace('/index.html', '') || '/';
    const page = routes[path] || routes['/'];
    app.innerHTML = await page();
};

export const navigate = (path) => {
    const base = window.location.pathname.includes('/frontend') ? '/frontend' : '';
    window.history.pushState({}, path, window.location.origin + base + path);
    router();
};