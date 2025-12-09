import { getActiveSorteos } from '../../../backend/services/sorteos.js';
import { createSorteo } from '../../../backend/services/admin.js';

export default async function Sorteos() {
    const sorteos = await getActiveSorteos();

    // Logic for Modal (Create)
    window.openSorteoModal = () => document.getElementById('sorteo-modal').style.display = 'flex';
    window.closeSorteoModal = () => document.getElementById('sorteo-modal').style.display = 'none';

    window.handleCreateSorteo = async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = 'Subiendo...';

        const titulo = document.getElementById('s-titulo').value;
        const precio = document.getElementById('s-precio').value;
        const fecha = document.getElementById('s-fecha_sorteo').value;
        const descripcion = document.getElementById('s-desc').value;

        const filePortada = document.getElementById('file-portada').files[0];
        const filesGaleria = document.getElementById('file-galeria').files;

        const success = await createSorteo(
            { titulo, precio, fecha_sorteo: fecha, descripcion }, // Nota: DB usa fecha_sorteo
            filePortada,
            filesGaleria
        );

        if (success) {
            alert('¡Sorteo Creado Exitosamente!');
            window.closeSorteoModal();
            window.switchModule('sorteos');
        } else {
            alert('Error al crear sorteo. Revisa la consola.');
        }
        btn.disabled = false;
        btn.innerText = 'Crear Sorteo';
    };

    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <h2 class="page-title" style="margin-bottom:0;">🎟️ Gestión de Sorteos</h2>
            <button class="btn btn-primary" onclick="window.openSorteoModal()">+ Nuevo Sorteo</button>
        </div>
        
        <div class="module-card" style="padding: 0;">
            <table class="data-table" style="margin: 20px;">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Precio</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${sorteos.map(s => `
                    <tr>
                        <td>${s.titulo}</td>
                        <td>$${s.precio}</td>
                        <td>${s.fecha_sorteo}</td>
                        <td><span class="badge" style="background:#d1fae5; color:#065f46;">Activo</span></td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>

        <div id="sorteo-modal" class="modal-backdrop" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Nuevo Sorteo</h3>
                </div>
                
                <form onsubmit="window.handleCreateSorteo(event)">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="form-label">Título del Sorteo</label>
                            <input type="text" id="s-titulo" class="form-input" placeholder="Ej. iPhone 15 Pro" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Precio del Boleto ($)</label>
                            <input type="number" id="s-precio" class="form-input" placeholder="0.00" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Fecha del Sorteo</label>
                        <input type="date" id="s-fecha_sorteo" class="form-input" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Descripción</label>
                        <textarea id="s-desc" class="form-textarea" placeholder="Detalles del premio..." rows="3"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Imagen de Portada</label>
                        <input type="file" id="file-portada" accept="image/*" required>
                        <p class="form-hint">Se recomienda 1080x1080px (Cuadrada)</p>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Galería de Imágenes</label>
                        <input type="file" id="file-galeria" accept="image/*" multiple>
                        <p class="form-hint">Puedes subir múltiples imágenes adicionales.</p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" onclick="window.closeSorteoModal()" class="btn btn-secondary">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Crear Sorteo</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}