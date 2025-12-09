import { getPastSorteos } from '../../../backend/services/sorteos.js';

export default async function Winners() {
    // AHORA ESPERAMOS los sorteos finalizados reales de Supabase
    const sorteosFinalizados = await getPastSorteos();

    return `
        <div class="winners-container">
            <h2 class="winners-header">🏆 Publicar Ganadores</h2>
            <form onsubmit="event.preventDefault(); alert('Ganador Publicado Mock');">
                <div class="form-group">
                    <label class="form-label">Sorteo Finalizado</label>
                    <select class="form-select">
                        ${sorteosFinalizados.map(s => `<option value="${s.id}">${s.titulo}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Nombre del Ganador</label>
                    <input type="text" class="form-input" placeholder="Ej. Juan Pérez">
                </div>
                <div class="form-group">
                    <label class="form-label">Foto de Entrega (URL)</label>
                    <input type="text" class="form-input" placeholder="https://...">
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 10px;">Publicar Ganador</button>
            </form>
        </div>
    `;
}