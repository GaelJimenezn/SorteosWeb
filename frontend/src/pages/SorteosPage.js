import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import RaffleCard from '../components/RaffleCard.js';
import { activeSorteos, pastSorteos } from '../../../backend/services/data.js';
import { openBuyOverlay } from '../components/BuyOverlay.js';

export default async function SorteosPage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    window.openBuy = () => openBuyOverlay(currentUser);

    // Helper to render past raffle cards (functionally similar to RaffleCard but maybe disabled button)
    const PastRaffleCard = (sorteo) => `
        <div class="card raffle-card grayscale">
            <img src="${sorteo.imagen}" alt="${sorteo.titulo}" class="card-img">
            <div class="card-body">
                <h3>${sorteo.titulo}</h3>
                <p>${sorteo.descripcion}</p>
                <div class="price-tag">Finalizado</div>
                <a href="#/ganadores/${sorteo.id}" class="btn-primary btn-outline w-100 text-center" style="display:block; text-decoration:none;">Ver Ganadores</a>
            </div>
        </div>
    `;

    return `
        ${Navbar()}
        
        <div class="page-container section-padding" style="margin-top: 60px;">
            <div class="text-center mb-50">
                <h1 class="text-primary">Nuestros Sorteos</h1>
                <p class="text-muted">Participa en los sorteos activos o revisa los resultados anteriores.</p>
            </div>

            <section id="active-sorteos" class="mb-50">
                <h2 class="text-accent mb-30" style="border-bottom: 2px solid var(--accent); display: inline-block; padding-bottom: 5px;">🔥 Sorteos Activos</h2>
                <div class="grid-cards">
                    ${activeSorteos.map(s => RaffleCard(s)).join('')}
                </div>
            </section>

            <section id="past-sorteos">
                <h2 class="text-muted mb-30" style="border-bottom: 2px solid #ccc; display: inline-block; padding-bottom: 5px;">📂 Sorteos Pasados</h2>
                <div class="grid-cards">
                    ${pastSorteos.map(s => PastRaffleCard(s)).join('')}
                </div>
            </section>
        </div>

        ${Footer()}
    `;
}
