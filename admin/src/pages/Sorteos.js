import { activeSorteos } from '../../../backend/services/data.js';
import { createSorteo } from '../../../backend/services/admin.js';

export default function Sorteos() {

    // Modal Logic
    window.openSorteoModal = () => {
        document.getElementById('sorteo-modal').style.display = 'flex';
    };

    window.closeSorteoModal = () => {
        document.getElementById('sorteo-modal').style.display = 'none';
        document.getElementById('sorteo-form').reset();
    };

    window.handleCreateSorteo = async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = 'Creando...';

        const titulo = document.getElementById('s-titulo').value;
        const precio = document.getElementById('s-precio').value;
        const fecha = document.getElementById('s-fecha').value;
        const descripcion = document.getElementById('s-desc').value;

        const filePortada = document.getElementById('file-portada').files[0];
        const filesGaleria = document.getElementById('file-galeria').files;

        const success = await createSorteo(
            { titulo, precio, fecha, descripcion },
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
        
        <div class="module-card" style="padding: 0; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead style="background: #F9FAFB;">
                    <tr>
                        <th style="padding: 15px 20px; text-align: left; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase;">Sorteo</th>
                        <th style="padding: 15px 20px; text-align: left; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase;">Precio</th>
                        <th style="padding: 15px 20px; text-align: left; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase;">Fecha</th>
                        <th style="padding: 15px 20px; text-align: left; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase;">Estado</th>
                        <th style="padding: 15px 20px; text-align: left; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${activeSorteos.map(s => `
                    <tr style="border-bottom: 1px solid #E5E7EB; transition: background 0.2s;">
                        <td style="padding: 15px 20px; font-weight: 500;">${s.titulo}</td>
                        <td style="padding: 15px 20px;">$${s.precio}</td>
                        <td style="padding: 15px 20px;">${s.fecha}</td>
                        <td style="padding: 15px 20px;"><span style="background: #ECFDF5; color: #047857; padding: 4px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600;">Activo</span></td>
                        <td style="padding: 15px 20px;">
                            <button class="btn btn-secondary btn-sm">Editar</button>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>

        <!-- MODAL -->
        <div id="sorteo-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center; backdrop-filter: blur(2px);">
            <div style="background: white; padding: 30px; border-radius: 16px; width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
                <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.25rem;">Crear Nuevo Sorteo</h3>
                <form id="sorteo-form" onsubmit="window.handleCreateSorteo(event)">
                    <div class="form-group mb-15" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom:5px; font-size: 0.9rem; color: var(--text-muted);">Título</label>
                        <input type="text" id="s-titulo" class="form-input" style="width:100%; padding: 10px; border:1px solid #E5E7EB; border-radius: 8px; font-family: inherit;" required>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                        <div class="form-group">
                            <label style="display:block; margin-bottom:5px; font-size: 0.9rem; color: var(--text-muted);">Precio ($)</label>
                            <input type="number" id="s-precio" class="form-input" style="width:100%; padding: 10px; border:1px solid #E5E7EB; border-radius: 8px; font-family: inherit;" required>
                        </div>
                        <div class="form-group">
                            <label style="display:block; margin-bottom:5px; font-size: 0.9rem; color: var(--text-muted);">Fecha del Sorteo</label>
                            <input type="date" id="s-fecha" class="form-input" style="width:100%; padding: 10px; border:1px solid #E5E7EB; border-radius: 8px; font-family: inherit;" required>
                        </div>
                    </div>
                    <div class="form-group mb-15" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom:5px; font-size: 0.9rem; color: var(--text-muted);">Descripción</label>
                        <textarea id="s-desc" class="form-input" style="width:100%; padding: 10px; border:1px solid #E5E7EB; border-radius: 8px; font-family: inherit; height:80px; resize: vertical;"></textarea>
                    </div>
                    
                    <div class="form-group mb-15" style="border-top:1px solid #F3F4F6; padding-top:15px; margin-bottom: 15px;">
                        <label style="display:block; margin-bottom:5px; font-weight:600; font-size: 0.9rem;">Imagen de Portada</label>
                        <input type="file" id="file-portada" accept="image/*" required style="font-size: 0.9rem;">
                    </div>

                    <div class="form-group mb-20" style="margin-bottom: 25px;">
                        <label style="display:block; margin-bottom:5px; font-weight:600; font-size: 0.9rem;">Galería de Imágenes</label>
                        <input type="file" id="file-galeria" accept="image/*" multiple style="font-size: 0.9rem;">
                        <p class="text-muted text-small" style="font-size: 0.8rem; margin: 5px 0 0;">Selecciona múltiples archivos.</p>
                    </div>

                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" onclick="window.closeSorteoModal()" class="btn btn-secondary">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Crear Sorteo</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}
