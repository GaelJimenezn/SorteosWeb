import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default async function TermsPage() {
    return `
        ${Navbar()}
        
        <div class="page-container section-padding" style="margin-top: 60px;">
            <div class="card" style="padding: 40px; max-width: 800px; margin: 0 auto;">
                <h1 class="text-primary text-center mb-30">Términos y Condiciones</h1>
                
                <div class="text-left text-muted" style="line-height: 1.6;">
                    <h3 class="text-accent mb-10">1. Organización</h3>
                    <p class="mb-20">Los sorteos son organizados por Sorteos UCQ con fines de recaudación para becas y mejoras educativas.</p>

                    <h3 class="text-accent mb-10">2. Participación</h3>
                    <p class="mb-20">Podrán participar todas las personas mayores de 18 años residentes en el territorio nacional. Al comprar un boleto, el participante acepta estas reglas.</p>

                    <h3 class="text-accent mb-10">3. Boletos y Pagos</h3>
                    <p class="mb-20">Los boletos apartados tienen una vigencia de reserva de 12 horas. Si no se reporta el pago en ese lapso, se liberarán automáticamente.</p>

                    <h3 class="text-accent mb-10">4. Selección de Ganadores</h3>
                    <p class="mb-20">Los ganadores se determinarán en base a las últimas cifras de la Lotería Nacional en la fecha estipulada para cada sorteo.</p>

                    <h3 class="text-accent mb-10">5. Reclamación de Premios</h3>
                    <p class="mb-20">Los ganadores cuentan con 20 días hábiles para reclamar su premio presentando identificación oficial y el boleto digital o comprobante de compra.</p>
                </div>
                
                <div class="text-center mt-40">
                    <a href="#/" class="btn-primary">Entendido, Volver al Inicio</a>
                </div>
            </div>
        </div>

        ${Footer()}
    `;
}
