import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import RaffleCard from '../components/RaffleCard.js';
import { openBuyOverlay } from '../components/BuyOverlay.js'; // El overlay que pediste
import { sorteoInfo } from '../../services/data.js';

export default async function Home() {
    // Configuración inicial
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    window.openBuy = () => openBuyOverlay(currentUser);

    // Datos simulados para el catálogo
    const sorteos = [
        { ...sorteoInfo, titulo: "iPhone 15 Pro - Edición UCQ", imagen: "https://via.placeholder.com/400x250?text=iPhone+15" },
        { ...sorteoInfo, titulo: "Beca del 100% Anual", precio: 50, imagen: "https://via.placeholder.com/400x250?text=Beca+Universitaria" }
    ];

    return `
        ${Navbar()}

        <header style="background: linear-gradient(rgba(16,48,86,0.9), rgba(16,48,86,0.8)), url('https://via.placeholder.com/1200x600?text=Campus+UCQ'); background-size: cover; color: white; padding: 100px 0; text-align: center;">
            <div class="page-container animate">
                <h1 style="font-size: 3rem; margin-bottom: 20px;">Sorteos Universitarios</h1>
                <p style="font-size: 1.2rem; margin-bottom: 40px;">Tu apoyo construye el futuro de nuestra comunidad.</p>
                <button onclick="window.openBuy()" class="btn-primary" style="font-size: 1.2rem; padding: 15px 40px; box-shadow: 0 0 20px rgba(120, 166, 75, 0.5);">
                    🎟️ CONSEGUIR BOLETOS AHORA
                </button>
            </div>
        </header>

        <section id="sorteos-grid" class="page-container" style="padding: 60px 20px;">
            <h2 style="color: var(--primary); text-align: center; margin-bottom: 40px;">Sorteos Activos</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                ${sorteos.map(s => RaffleCard(s)).join('')}
            </div>
        </section>

        <section id="about-section" style="background: white; padding: 80px 0;">
            <div class="page-container">
                <div style="text-align: center; margin-bottom: 50px;">
                    <h2 style="color: var(--primary);">Nuestra Identidad</h2>
                    <p style="color: #666;">Conoce el propósito detrás de cada boleto.</p>
                </div>
                
                <div style="display: grid; md:grid-cols-2; gap: 50px; align-items: center;">
                    <div>
                        <h3 style="color: var(--accent); margin-bottom: 15px;">Breve Historia</h3>
                        <p style="margin-bottom: 20px;">Fundada con el objetivo de fortalecer la infraestructura y becas estudiantiles, la organización de Sorteos UCQ ha crecido desde pequeños eventos locales hasta convertirse en un pilar de apoyo para cientos de alumnos.</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: var(--bg-body); padding: 15px; border-radius: 8px;">
                                <h4 style="color: var(--primary); font-size: 1rem;">Misión</h4>
                                <p style="font-size: 0.9rem;">Generar recursos transparentes para el desarrollo académico.</p>
                            </div>
                            <div style="background: var(--bg-body); padding: 15px; border-radius: 8px;">
                                <h4 style="color: var(--primary); font-size: 1rem;">Visión</h4>
                                <p style="font-size: 0.9rem;">Ser el referente nacional en sorteos universitarios confiables.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: var(--primary); color: white; padding: 40px; border-radius: 12px; position: relative;">
                        <h3 style="margin-bottom: 20px;">Nuestros Valores</h3>
                        <ul style="line-height: 2;">
                            <li>✅ <strong>Transparencia:</strong> Cuentas claras en cada sorteo.</li>
                            <li>✅ <strong>Compromiso:</strong> Con la educación de calidad.</li>
                            <li>✅ <strong>Integridad:</strong> Procesos auditados y seguros.</li>
                            <li>✅ <strong>Solidaridad:</strong> Apoyo mutuo universitario.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section id="faq-contact-section" style="background: var(--bg-body); padding: 80px 0;">
            <div class="page-container">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 50px;">Centro de Ayuda</h2>
                
                <div style="display: grid; md:grid-cols-2; gap: 60px;">
                    
                    <div>
                        <h3 style="margin-bottom: 20px;">Preguntas Frecuentes</h3>
                        
                        <details style="background: white; padding: 20px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); cursor: pointer;">
                            <summary style="font-weight: bold; color: var(--primary);">¿Cómo reporto mi pago?</summary>
                            <p style="margin-top: 10px; color: #555;">Al reservar tu boleto, el sistema te redirigirá automáticamente a WhatsApp. Ahí podrás enviar la foto de tu comprobante.</p>
                        </details>

                        <details style="background: white; padding: 20px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); cursor: pointer;">
                            <summary style="font-weight: bold; color: var(--primary);">¿Cuánto tiempo tengo para pagar?</summary>
                            <p style="margin-top: 10px; color: #555;">Tienes un lapso de 12 horas para enviar tu comprobante. De lo contrario, el boleto se libera.</p>
                        </details>

                        <details style="background: white; padding: 20px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); cursor: pointer;">
                            <summary style="font-weight: bold; color: var(--primary);">¿Cómo sé si gané?</summary>
                            <p style="margin-top: 10px; color: #555;">Publicamos los resultados en nuestras redes y contactamos directamente a los ganadores por teléfono.</p>
                        </details>
                    </div>

                    <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: var(--shadow);">
                        <h3 style="color: var(--primary); margin-bottom: 10px;">¿Aún con dudas?</h3>
                        <p style="margin-bottom: 20px; color: #666;">Envíanos un mensaje directo al administrador.</p>
                        
                        <form onsubmit="event.preventDefault(); alert('Mensaje enviado al administrador.');">
                            <div style="margin-bottom: 15px;">
                                <label style="font-size: 0.9rem; font-weight: bold;">Nombre Completo</label>
                                <input type="text" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; margin-top: 5px;">
                            </div>
                            
                            <div style="margin-bottom: 15px;">
                                <label style="font-size: 0.9rem; font-weight: bold;">Correo o Teléfono</label>
                                <input type="text" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; margin-top: 5px;">
                            </div>

                            <div style="margin-bottom: 20px;">
                                <label style="font-size: 0.9rem; font-weight: bold;">Mensaje</label>
                                <textarea required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; margin-top: 5px; height: 100px;"></textarea>
                            </div>

                            <button type="submit" class="btn-primary" style="width: 100%;">Enviar Consulta</button>
                        </form>
                    </div>

                </div>
            </div>
        </section>

        ${Footer()}
    `;
}