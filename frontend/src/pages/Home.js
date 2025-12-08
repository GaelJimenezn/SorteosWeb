// Asegúrate de que los puntos ".." apunten a la carpeta correcta
import Navbar from '../components/Navbar.js';
import HeroSlider from '../components/HeroSlider.js';
import RaffleCard from '../components/RaffleCard.js';
import FAQSection from '../components/FAQSection.js';
import Footer from '../components/Footer.js';
import { openBuyOverlay } from '../components/BuyOverlay.js';
// Ajuste de ruta para el backend (asegúrate de que tu servidor permita subir tantos niveles)
import { activeSorteos } from '../../../backend/services/data.js';

export default async function Home() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    window.openBuy = () => openBuyOverlay(currentUser);

    const sorteos = activeSorteos;

    return `
        ${Navbar()}
        ${HeroSlider()}
        
        <section id="sorteos-grid" class="page-container section-padding">
            <h2 class="text-center text-primary mb-40">Sorteos Activos</h2>
            <div class="carousel-container">
                ${sorteos.map(s => `<div class="carousel-item">${RaffleCard(s)}</div>`).join('')}
            </div>
            <div class="text-center mt-20">
                <a href="#/sorteos" class="btn-primary btn-outline">Ver más Sorteos</a>
            </div>
        </section>

        <section id="about-section" class="bg-white section-padding">
            <div class="page-container">
                <div class="text-center mb-50">
                    <h2 class="text-primary">Nuestra Identidad</h2>
                    <p class="text-muted">Conoce el propósito detrás de cada boleto.</p>
                </div>
                <div class="about-grid">
                    <div>
                        <h3 class="text-accent mb-20">Nuestra Historia</h3>
                        <p class="mb-20">Fundada para apoyar el desarrollo estudiantil a través de sorteos transparentes.</p>
                        <div class="mission-grid">
                            <div class="info-box"><h4 class="info-title">Misión</h4><p class="text-small">Generar recursos transparentes.</p></div>
                            <div class="info-box"><h4 class="info-title">Visión</h4><p class="text-small">Ser referente nacional.</p></div>
                        </div>
                    </div>
                    <div class="values-card">
                        <h3 class="mb-20">Valores</h3>
                        <ul class="values-list">
                            <li>✅ Transparencia</li>
                            <li>✅ Compromiso</li>
                            <li>✅ Integridad</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        ${FAQSection()}
        ${Footer()}
    `;
}