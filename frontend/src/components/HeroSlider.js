import { sorteoInfo } from '../../../backend/services/data.js';

export default function HeroSlider() {
    return `
    <header class="hero">
        <div class="page-container animate">
            <span class="hero-tag">EDICIÓN 2025</span>
            <h1 class="hero-title">${sorteoInfo.titulo}</h1>
            <p class="hero-desc">${sorteoInfo.descripcion}</p>
            <button class="btn-primary" onclick="window.openBuy()">
                Conseguir Boletos Ahora
            </button>
        </div>
    </header>`;
}