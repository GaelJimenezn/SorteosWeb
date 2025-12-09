import { getPastSorteos, saveWinnerEvidence } from '../../../backend/services/sorteos.js';
import { uploadImage } from '../../../backend/services/admin.js';

export default async function Winners() {
    // Escuchar evento para guardar evidencia
    window.handleSaveEvidence = async (sorteoId) => {
        const fileInput = document.getElementById(`evidence-file-${sorteoId}`);
        const urlInput = document.getElementById(`evidence-url-${sorteoId}`);
        const btn = document.getElementById(`btn-save-${sorteoId}`);

        const file = fileInput.files[0];
        const urlValue = urlInput.value.trim();

        if (!file && !urlValue) {
            return alert("Por favor selecciona un archivo O ingresa una URL.");
        }

        btn.disabled = true;
        btn.innerText = "Procesando...";

        try {
            let finalUrl = urlValue;

            // Si hay archivo, tiene prioridad (o se sube primero)
            if (file) {
                btn.innerText = "Subiendo imagen...";
                finalUrl = await uploadImage(file);
            }

            // Guardar URL en la DB
            btn.innerText = "Guardando...";
            const { success, error } = await saveWinnerEvidence(sorteoId, finalUrl);

            if (success) {
                alert("Evidencia guardada correctamente.");
                window.location.reload();
            } else {
                alert("Error al guardar en base de datos: " + error);
                btn.disabled = false;
                btn.innerText = "Guardar Evidencia";
            }
        } catch (err) {
            alert("Error: " + err.message);
            btn.disabled = false;
            btn.innerText = "Guardar Evidencia";
        }
    };

    const sorteosFinalizados = await getPastSorteos();

    if (sorteosFinalizados.length === 0) {
        return `
            <div class="winners-container text-center">
                <h2>🏆 Publicar Ganadores</h2>
                <p class="text-muted">Aún no hay sorteos finalizados.</p>
            </div>
        `;
    }

    const renderCard = (s) => {
        const ganador = s.ganador_info || {};
        const tieneGanador = !!s.ganador_info;
        const evidencia = s.evidencia_url;

        return `
            <div class="module-card" style="margin-bottom: 20px;">
                <h3 style="margin-bottom: 5px; color: var(--color-primary);">${s.titulo}</h3>
                <p class="text-muted" style="font-size: 0.85rem;">📅 Finalizado: ${new Date(s.fecha_sorteo).toLocaleDateString()}</p>
                
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">

                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <!-- INFO GANADOR -->
                    <div style="flex: 1; min-width: 250px;">
                        <h4 style="margin-bottom: 10px;">👤 Ganador Registrado</h4>
                        ${tieneGanador ? `
                            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
                                <div style="font-weight: 700; font-size: 1.1rem; color: #10B981;">${ganador.nombre}</div>
                                <div style="margin-top: 5px; font-size: 0.9rem;">
                                    <div>🎟️ Boleto: <strong>#${ganador.numero}</strong></div>
                                    <div>📧 Email: ${ganador.email}</div>
                                    <div>📞 Tel: ${ganador.telefono}</div>
                                    <div>📍 ${ganador.ciudad}, ${ganador.estado_cliente}</div>
                                </div>
                            </div>
                        ` : `
                            <div class="alert alert-warning">
                                No hay información de ganador registrada automáticamente.
                            </div>
                        `}
                    </div>

                    <!-- EVIDENCIA -->
                    <div style="flex: 1; min-width: 250px;">
                        <h4 style="margin-bottom: 10px;">📸 Evidencia de Entrega</h4>
                        ${evidencia ? `
                            <div style="margin-bottom: 10px;">
                                <img src="${evidencia}" alt="Evidencia" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; border: 1px solid #ddd;">
                                <a href="${evidencia}" target="_blank" style="display:block; margin-top:5px; font-size:0.8rem; text-align:right;">Ver imagen completa ↗</a>
                            </div>
                            <div class="text-muted" style="font-size: 0.8rem;">✅ Evidencia cargada</div>
                        ` : `
                            <div>
                                <label class="form-label" style="font-size: 0.85rem;">Opción 1: Subir Archivo</label>
                                <input type="file" id="evidence-file-${s.id}" class="form-input" accept="image/*" style="margin-bottom: 10px;">
                                
                                <label class="form-label" style="font-size: 0.85rem;">Opción 2: Pegar URL</label>
                                <input type="text" id="evidence-url-${s.id}" class="form-input" placeholder="https://..." style="margin-bottom: 15px;">

                                <button id="btn-save-${s.id}" onclick="window.handleSaveEvidence('${s.id}')" class="btn btn-primary" style="width: 100%;">
                                    Guardar Evidencia
                                </button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    };

    return `
        <div style="max-width: 900px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 class="page-title" style="margin:0;">🏆 Gestión de Ganadores</h2>
            </div>
            
            <div id="winners-grid">
                ${sorteosFinalizados.map(renderCard).join('')}
            </div>
        </div>
    `;
}