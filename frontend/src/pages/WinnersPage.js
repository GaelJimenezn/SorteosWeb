import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { getPastSorteos } from '../../../backend/services/sorteos.js';

export default async function WinnersPage() {
    const ganadores = await getPastSorteos();

    return `
        ${Navbar()}
        
        <div class="page-container section-padding" style="margin-top: 60px;">
            <div class="text-center mb-50">
                <h1 class="text-primary">Salón de la Fama 🏆</h1>
                <p class="text-muted">Historial de nuestros sorteos finalizados.</p>
            </div>

            <div class="grid-cards" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
                ${ganadores.length > 0 ? ganadores.map(s => `
                    <div class="card winner-card text-center" style="padding: 30px;">
                        <h3 class="mb-10 text-primary">${s.titulo}</h3>
                        <p class="text-muted text-small mb-20">Sorteo realizado el: ${s.fecha_sorteo}</p>
                        <div class="badge-tag mb-20" style="background: #e6fffa; color: #00b894; display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold;">
                            Finalizado
                        </div>
                        <img src="${s.imagen_portada}" style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin-top:10px;">
                    </div>
                `).join('') : '<p class="text-center w-100">Aún no hay ganadores registrados.</p>'}
            </div>
        </div>

        ${Footer()}
    `;
}