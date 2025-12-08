import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default async function ContactPage() {
    return `
        ${Navbar()}
        
        <div class="page-container section-padding" style="margin-top: 60px; min-height: 60vh;">
            <div class="text-center mb-50">
                <h1 class="text-primary">Contáctanos</h1>
                <p class="text-muted">Estamos aquí para resolver tus dudas. Elige tu medio preferido.</p>
            </div>

            <div class="grid-cards" style="max-width: 900px; margin: 0 auto; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
                
                <!-- Card WhatsApp -->
                <div class="card text-center" style="padding: 30px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">📱</div>
                    <h3 class="mb-10">WhatsApp</h3>
                    <p class="text-muted mb-20 text-small">Respuesta rápida</p>
                    <a href="https://wa.me/5211234567890" target="_blank" class="btn-primary w-100 btn-whatsapp">
                        Enviar Mensaje
                    </a>
                </div>

                <!-- Card Instagram -->
                <div class="card text-center" style="padding: 30px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">📸</div>
                    <h3 class="mb-10">Instagram</h3>
                    <p class="text-muted mb-20 text-small">Síguenos y escríbenos</p>
                    <a href="https://instagram.com/tu_usuario" target="_blank" class="btn-primary w-100 btn-facebook" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);">
                        Ir a Instagram
                    </a>
                </div>

                <!-- Card Email -->
                <div class="card text-center" style="padding: 30px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">✉️</div>
                    <h3 class="mb-10">Correo</h3>
                    <p class="text-muted mb-20 text-small">Consultas generales</p>
                    <a href="mailto:contacto@sorteosucq.com" class="btn-primary w-100" style="background-color: #555;">
                        Enviar Correo
                    </a>
                </div>

            </div>
        </div>

        ${Footer()}
    `;
}
