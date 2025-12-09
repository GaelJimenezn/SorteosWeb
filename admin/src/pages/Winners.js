import { getPastSorteos } from '../../../backend/services/sorteos.js';

export default async function Winners() {
    // AHORA ESPERAMOS los sorteos finalizados reales de Supabase
    const sorteosFinalizados = await getPastSorteos();

    return `
        <h2 class="mb-30">🏆 Publicar Ganadores</h2>
        <div class="module-card" style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 600px;">
            <form onsubmit="event.preventDefault(); alert('Ganador Publicado Mock');">
                <div style="margin-bottom: 20px;">
                    <label style="display:block; margin-bottom:5px; font-weight:bold;">Sorteo Finalizado</label>
                    <select class="form-input" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;">
                        ${sorteosFinalizados.map(s => `<option value="${s.id}">${s.titulo}</option>`).join('')}
                    </select>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display:block; margin-bottom:5px; font-weight:bold;">Nombre del Ganador</label>
                    <input type="text" class="form-input" placeholder="Ej. Juan Pérez" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;">
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display:block; margin-bottom:5px; font-weight:bold;">Foto de Entrega (URL)</label>
                    <input type="text" class="form-input" placeholder="https://..." style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;">
                </div>
                <button class="btn-primary w-100">Publicar Ganador</button>
            </form>
        </div>
    `;
}