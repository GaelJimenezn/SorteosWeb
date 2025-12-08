import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default async function RefundsPage() {
    return `
        ${Navbar()}
        
        <div class="page-container section-padding" style="margin-top: 60px;">
            <div class="card" style="padding: 40px; max-width: 800px; margin: 0 auto;">
                <h1 class="text-primary text-center mb-30">Política de Reembolsos y Cancelación</h1>
                
                <div class="text-left text-muted" style="line-height: 1.6;">
                    <h3 class="text-accent mb-10">1. Cancelaciones</h3>
                    <p class="mb-20">Los boletos apartados pueden ser cancelados automáticamente si no se recibe el comprobante de pago en el lapso de 12 horas estipulado.</p>

                    <h3 class="text-accent mb-10">2. Reembolsos</h3>
                    <p class="mb-20">Debido a la naturaleza de los sorteos benéficos, <strong>no se realizan reembolsos</strong> una vez confirmado el boleto, salvo en caso de cancelación total del evento.</p>

                    <h3 class="text-accent mb-10">3. Boletos no Pagados</h3>
                    <p class="mb-20">Cualquier boleto apartado que no haya sido liquidado antes de la fecha del sorteo será considerado nulo.</p>

                    <h3 class="text-accent mb-10">4. Aclaraciones</h3>
                    <p class="mb-20">Cualquier duda sobre pagos puede ser escalada a nuestro correo de soporte: <a href="mailto:soporte@sorteosucq.com">soporte@sorteosucq.com</a>.</p>
                </div>
                
                <div class="text-center mt-40">
                    <a href="#/" class="btn-primary">Entendido</a>
                </div>
            </div>
        </div>

        ${Footer()}
    `;
}
