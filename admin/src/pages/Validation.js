import { getPendientes, validarBoleto, rechazarBoleto } from '../../../backend/services/data.js';

export default function Validation() {
    const pendientes = getPendientes();

    // Global handlers for buttons
    window.handleConfirm = (n) => {
        if (validarBoleto(n)) {
            // Re-render handled by main.js update mechanism or manually reload
            window.switchModule('validation');
        }
    };

    window.handleReject = (n) => {
        if (rechazarBoleto(n)) {
            window.switchModule('validation');
        }
    };

    if (pendientes.length === 0) {
        return `
            <h2 class="mb-30">✅ Validación de Boletos</h2>
            <div class="module-card text-center" style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <p class="text-muted">✨ No hay boletos pendientes por validar.</p>
            </div>
        `;
    }

    return `
        <h2 class="mb-30">✅ Validación de Boletos</h2>
        <div class="module-card" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid #eee;">
                        <th style="padding: 15px; text-align: left;"># Boleto</th>
                        <th style="padding: 15px; text-align: left;">Cliente</th>
                        <th style="padding: 15px; text-align: left;">Teléfono</th>
                        <th style="padding: 15px; text-align: left;">Estado</th>
                        <th style="padding: 15px; text-align: left;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${pendientes.map(b => `
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 15px; font-weight:bold; font-size:1.2rem;">${b.numero}</td>
                        <td style="padding: 15px;">${b.cliente.nombre}</td>
                        <td style="padding: 15px;">${b.cliente.telefono}</td>
                        <td style="padding: 15px;"><span style="background: #fff3cd; color: #856404; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem;">Pendiente</span></td>
                        <td style="padding: 15px;">
                            <button onclick="window.handleConfirm(${b.numero})" class="btn-primary" style="background:#27ae60; padding:5px 10px; margin-right:5px; width:35px;">✓</button>
                            <button onclick="window.handleReject(${b.numero})" class="btn-primary" style="background:#e74c3c; padding:5px 10px; width:35px;">✕</button>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}
