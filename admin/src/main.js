import Dashboard from './components/Dashboard.js';

const initAdmin = async () => {
    const app = document.getElementById('admin-app');
    app.innerHTML = `<div id="dashboard-mount"></div>`;
    await Dashboard();
};

document.addEventListener('DOMContentLoaded', initAdmin);