import { sorteoInfo } from '../../services/data.js';

export default function HeroSlider() {
    return `
    <header style="background: linear-gradient(135deg, var(--primary) 40%, #0d2542 100%); color: white; padding: 100px 0 140px; text-align: center; clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);">
        <div class="page-container animate">
            <span style="background: var(--accent); padding: 5px 15px; border-radius: 4px; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px;">EDICIÓN 2025</span>
            <h1 style="font-size: 3.5rem; margin: 20px 0; font-weight: 800;">${sorteoInfo.titulo}</h1>
            <p style="font-size: 1.2rem; opacity: 0.9; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto;">${sorteoInfo.descripcion}</p>
            <button class="btn-primary" onclick="document.getElementById('boletos-section').scrollIntoView({behavior: 'smooth'})">
                Adquirir Boleto $${sorteoInfo.precio}
            </button>
        </div>
    </header>
    `;
}