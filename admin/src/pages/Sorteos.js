import { activeSorteos } from '../../../backend/services/data.js';

export default function Sorteos() {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <h2>🎟️ Gestión de Sorteos</h2>
            <button class="btn-primary" onclick="alert('Función Mock: Abrir Modal Crear Sorteo')">+ Nuevo Sorteo</button>
        </div>
        
        <div class="module-card" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid #eee;">
                        <th style="padding: 15px; text-align: left;">Sorteo</th>
                        <th style="padding: 15px; text-align: left;">Precio</th>
                        <th style="padding: 15px; text-align: left;">Fecha</th>
                        <th style="padding: 15px; text-align: left;">Estado</th>
                        <th style="padding: 15px; text-align: left;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${activeSorteos.map(s => `
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 15px;">${s.titulo}</td>
                        <td style="padding: 15px;">$${s.precio}</td>
                        <td style="padding: 15px;">${s.fecha}</td>
                        <td style="padding: 15px;"><span style="background: #d4edda; color: #155724; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem;">Activo</span></td>
                        <td style="padding: 15px;">
                            <button class="btn-primary" style="padding: 5px 10px; font-size: 0.8rem;">Editar</button>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}
