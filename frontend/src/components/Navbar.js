import { openAuthModal } from './AuthModal.js';

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    window.openLogin = () => openAuthModal('user');
    window.logout = () => { localStorage.removeItem('currentUser'); location.reload(); };

    const authHTML = user
        ? `<div class="auth-box">
             <span>Hola, <strong>${user.nombre}</strong></span>
             <button onclick="window.logout()" class="btn-primary" style="padding:5px 10px; font-size:0.8rem;">Salir</button>
           </div>`
        : `<div class="auth-box">
             <button onclick="window.openLogin()" class="btn-primary">Ingresar / Registrar</button>
           </div>`;

    return `
    <nav class="navbar">
        <div class="page-container navbar-container">
            <div class="brand">
                <span>SORTEOS</span> <span class="brand-badge">UCQ</span>
            </div>
            <div class="nav-links">
                <a href="#/">Inicio</a>
                <a href="#/sorteos">Sorteos</a>
                <a href="#/ganadores">Ganadores</a>
                <a href="#/contacto">Contacto</a>
            </div>
            ${authHTML}
        </div>
    </nav>`;
}