import Navbar from '../components/Navbar.js';
import HeroSlider from '../components/HeroSlider.js';
import RaffleCard from '../components/RaffleCard.js';
import FAQSection from '../components/FAQSection.js';
import Footer from '../components/Footer.js';
import { openBuyOverlay } from '../components/BuyOverlay.js';
import { getActiveSorteos } from '../../../backend/services/sorteos.js';

export default async function Home() {
    console.log("🔵 [Home] Renderizando página de inicio...");
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Pasamos el ID del sorteo a la función de compra
    window.openBuy = (sorteoId) => {
        console.log("🖱️ [Click] Abrir modal de compra para sorteo:", sorteoId);
        openBuyOverlay(currentUser, sorteoId);
    };

    // Obtenemos datos reales
    const sorteos = await getActiveSorteos();

    // Renderizamos
    const sorteosHTML = sorteos.length > 0
        ? sorteos.map(s => `<div class="carousel-item">${RaffleCard(s)}</div>`).join('')
        : '<div class="text-center p-20"><h3>Aún no hay sorteos activos</h3><p>Vuelve pronto.</p></div>';

    return `
        ${Navbar()}
        ${sorteos.length > 0 ? HeroSlider(sorteos[0]) : ''}
        
        <section id="sorteos-grid" class="page-container section-padding">
            <h2 class="text-center text-primary mb-40">Sorteos Activos</h2>
            <div class="carousel-container">
                ${sorteosHTML}
            </div>
            <div class="text-center mt-20">
                <a href="#/sorteos" class="btn-primary btn-outline">Ver todos los Sorteos</a>
            </div>
        </section>

        <section id="about-section" class="bg-white section-padding">
            <div class="page-container">
                <div class="text-center mb-50">
                    <h2 class="text-primary">Nuestra Identidad</h2>
                    <p class="text-muted">Transparencia y confianza en cada sorteo.</p>
                </div>
                <div class="about-grid">
                    <div>
                        <h3 class="text-accent mb-20">¿Quiénes somos?</h3>
                        <p class="mb-20">Somos una plataforma dedicada a realizar sorteos con causa...</p>
                    </div>
                    <div class="values-card">
                        <h3 class="mb-20">Valores</h3>
                        <ul class="values-list">
                            <li>✅ Seguridad</li>
                            <li>✅ Confianza</li>
                            <li>✅ Transparencia</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        ${FAQSection()}
        ${Footer()}
    `;
}