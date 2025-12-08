import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default async function PrivacyPage() {
    return `
        ${Navbar()}
        
        <div class="page-container section-padding" style="margin-top: 60px;">
            <div class="card" style="padding: 40px; max-width: 800px; margin: 0 auto;">
                <h1 class="text-primary text-center mb-30">Aviso de Privacidad</h1>
                
                <div class="text-left text-muted" style="line-height: 1.6;">
                    <p class="mb-20">En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, Sorteos UCQ informa:</p>

                    <h3 class="text-accent mb-10">1. Responsable de los Datos</h3>
                    <p class="mb-20">Sorteos UCQ, con domicilio en Santiago de Querétaro, MX, es responsable del tratamiento de sus datos personales.</p>

                    <h3 class="text-accent mb-10">2. Finalidad del Tratamiento</h3>
                    <p class="mb-20">Sus datos serán utilizados para: identificación, contacto en caso de ganar, y fines estadísticos internos. No compartimos sus datos con terceros.</p>

                    <h3 class="text-accent mb-10">3. Derechos ARCO</h3>
                    <p class="mb-20">Usted puede acceder, rectificar, cancelar u oponerse al tratamiento de sus datos contactando a: <a href="mailto:soporte@sorteosucq.com">soporte@sorteosucq.com</a>.</p>
                </div>
                
                <div class="text-center mt-40">
                    <a href="#/" class="btn-primary">Volver al Inicio</a>
                </div>
            </div>
        </div>

        ${Footer()}
    `;
}
