import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import RaffleCard from '../components/RaffleCard.js';
import { getActiveSorteos, getPastSorteos } from '../../../backend/services/sorteos.js';

export default async function SorteosPage() {
    // 1. Cargar datos en paralelo
    const [activos, pasados] = await Promise.all([
        getActiveSorteos(),
        getPastSorteos()
    ]);

    const PastRaffleCard = (sorteo) => `
        <div class="card raffle-card grayscale" style="opacity: 0.8;">
            <div class="card-img-box">
                 <img src="${sorteo.imagen_portada}" alt="${sorteo.titulo}" class="card-img">
                 <span class="card-badge" style="background:#666;">Finalizado</span>
            </div>
            <div class="card-body">
                <h3>${sorteo.titulo}</h3>
                <p class="text-small text-muted">${sorteo.fecha_sorteo}</p>
                <a href="#/ganadores" class="btn-secondary w-100 text-center" style="display:block; text-decoration:none; margin-top:10px;">Ver Ganadores</a>
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
                    ${activos.length > 0
            ? activos.map(s => RaffleCard(s)).join('')
            : '<p class="text-muted">No hay sorteos activos en este momento.</p>'}
                </div>
            </section>

            <section id="past-sorteos">
                <h2 class="text-muted mb-30" style="border-bottom: 2px solid #ccc; display: inline-block; padding-bottom: 5px;">📂 Sorteos Pasados</h2>
                <div class="grid-cards">
                    ${pasados.length > 0
            ? pasados.map(s => PastRaffleCard(s)).join('')
            : '<p class="text-muted">No hay historial de sorteos.</p>'}
                </div>
            </section>
        </div>

        ${Footer()}
    `;
}