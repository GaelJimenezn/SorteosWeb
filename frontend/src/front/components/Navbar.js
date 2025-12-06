import { openAuthModal } from './AuthModal.js';

export default function Navbar() {
    // 1. Verificar si hay sesión
    const user = JSON.parse(localStorage.getItem('currentUser'));

    // 2. Definir acciones globales
    window.openLogin = () => openAuthModal('user');
    window.openRegister = () => alert("Formulario de Registro (Pendiente)");
    window.logout = () => { localStorage.removeItem('currentUser'); location.reload(); };

    // 3. Contenido dinámico
    const authButtons = user
        ? `<div style="display: flex; align-items: center; gap: 15px;">
             <span style="font-size: 0.9rem;">Hola, <strong>${user.nombre}</strong></span>
             <button onclick="window.logout()" style="background:none; border: 1px solid rgba(255,255,255,0.3); color: white; padding: 5px 12px; border-radius: 4px; cursor: pointer;">Salir</button>
           </div>`
        : `<div style="display: flex; gap: 10px;">
             <button onclick="window.openLogin()" style="background: transparent; color: white; border: none; font-weight: 500; cursor: pointer;">Iniciar Sesión</button>
             <button onclick="window.openRegister()" class="btn-primary" style="padding: 8px 20px; font-size: 0.9rem;">Regístrate</button>
           </div>`;

    return `
    <nav style="background: var(--primary); padding: 15px 0; color: white; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
        <div class="page-container" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 800; font-size: 1.3rem; letter-spacing: 0.5px; display: flex; align-items: center; gap: 10px;">
                <span>SORTEOS</span> <span style="background: var(--accent); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">UCQ</span>
            </div>

            <div class="nav-links" style="display: flex; align-items: center; gap: 20px;">
                <a href="/" data-link style="color: white; text-decoration: none; opacity: 0.9;">Inicio</a>
                <a href="#" onclick="document.getElementById('sorteos-grid').scrollIntoView({behavior:'smooth'})" style="color: white; text-decoration: none; opacity: 0.9;">Sorteos</a>
                <a href="#" onclick="document.getElementById('footer-pro').scrollIntoView()" style="color: white; text-decoration: none; opacity: 0.9;">Contacto</a>
            </div>

            <div>${authButtons}</div>
        </div>
    </nav>
    `;
}