import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { pastSorteos } from '../../../backend/services/data.js';

export default async function WinnersPage(highlightId) {

    // Defer scrolling until after render
    setTimeout(() => {
        if (highlightId) {
            const el = document.getElementById(`winner-${highlightId}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('highlight-pulse');
            }
        }
    }, 100);

    return `
        ${Navbar()}
        
        <div class="page-container section-padding" style="margin-top: 60px;">
            <div class="text-center mb-50">
                <h1 class="text-primary">Nuestros Ganadores 🏆</h1>
                <p class="text-muted">Conoce a las personas afortunadas que han ganado con nosotros.</p>
            </div>

            <div class="grid-cards" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
                ${pastSorteos.map(s => {
        const isHighlight = s.id === highlightId;
        const highlightStyle = isHighlight ? 'border: 2px solid var(--primary); transform: scale(1.05); box-shadow: 0 0 20px rgba(0,0,0,0.2);' : '';

        return `
                    <div id="winner-${s.id}" class="card winner-card text-center" style="padding: 30px; ${highlightStyle}">
                        <div style="margin-bottom: 20px;">
                            <img src="${s.ganador.foto}" alt="${s.ganador.nombre}" 
                                style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid var(--accent);">
                        </div>
                        <h3 class="mb-10 text-primary">${s.ganador.nombre}</h3>
                        <div class="badge-tag mb-20" style="background: #e6fffa; color: #00b894; display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold;">
                            ¡Felicidades!
                        </div>
                        <p class="text-muted text-small">Ganador del sorteo:</p>
                        <p class="text-bold">${s.titulo}</p>
                        <p class="text-small text-muted mt-10">${s.fecha}</p>
                    </div>
                `}).join('')}
            </div>
        </div>

        ${Footer()}
    `;
}
