import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { activeSorteos, pastSorteos } from '../../../backend/services/data.js';
import { openBuyOverlay } from '../components/BuyOverlay.js';

export default async function RaffleDetailPage(id) {
    const allSorteos = [...activeSorteos, ...pastSorteos];
    const sorteo = allSorteos.find(s => s.id === id);

    if (!sorteo) {
        return `
            ${Navbar()}
            <div class="page-container section-padding text-center" style="margin-top: 100px;">
                <h2>Sorteo no encontrado</h2>
                <a href="#/sorteos" class="btn-primary">Volver a lista</a>
            </div>
            ${Footer()}
        `;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    window.openBuy = () => openBuyOverlay(currentUser);

    // Gallery Logic (Inline for simplicity or separated later)
    const renderGallery = () => {
        if (!sorteo.galeria || sorteo.galeria.length === 0) return '';
        return `
            <div class="gallery-grid">
                ${sorteo.galeria.map(img => `<img src="${img}" alt="Detalle" class="gallery-img">`).join('')}
            </div>
        `;
    };

    return `
        ${Navbar()}
        
        <div class="page-container section-padding" style="margin-top: 60px;">
            <a href="#/sorteos" class="back-link mb-20">← Volver a Sorteos</a>
            
            <div class="detail-container">
                <div class="detail-main">
                    <img src="${sorteo.imagen}" alt="${sorteo.titulo}" class="detail-hero-img animate">
                    ${renderGallery()}
                </div>
                
                <div class="detail-info card">
                    <h1 class="text-primary">${sorteo.titulo}</h1>
                    <p class="detail-date text-muted mb-20">📅 Fecha del Sorteo: ${sorteo.fecha}</p>
                    
                    <div class="price-box mb-30">
                        <span class="price-label">Precio del Boleto</span>
                        <span class="price-value">$${sorteo.precio} MXN</span>
                    </div>

                    <p class="detail-desc mb-30">${sorteo.descripcion}</p>

                    ${sorteo.detalles ? `
                    <div class="features-list mb-30">
                        <h3 class="mb-10">Características del Premio:</h3>
                        <ul>
                            ${sorteo.detalles.map(d => `<li>• ${d}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}

                    ${!sorteo.finished ? `
                    <button onclick="window.openBuy()" class="btn-primary w-100 btn-large pulse">
                        🎟 Comprar Boletos Ahora
                    </button>
                    ` : `
                    <button class="btn-secondary w-100" disabled>Sorteo Finalizado</button>
                    `}
                </div>
            </div>
        </div>

        ${Footer()}
    `;
}
