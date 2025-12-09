import { getPendingBoletos, validateBoletoAdmin, rejectBoletoAdmin } from '../../../backend/services/admin.js';

export default async function Validation() {
    const pendientes = await getPendingBoletos();

    window.handleConfirm = async (id) => {
        if (confirm('¿Confirmar pago de este boleto?')) {
            const success = await validateBoletoAdmin(id);
            if (success) window.switchModule('validation');
        }
    };

    window.handleReject = async (id) => {
        if (confirm('¿Liberar boleto por falta de pago?')) {
            const success = await rejectBoletoAdmin(id);
            if (success) window.switchModule('validation');
        }
    };

    if (pendientes.length === 0) {
        return `
            <h2 class="mb-30">✅ Validación de Boletos</h2>
            <div class="module-card text-center">
                <p class="text-muted">✨ No hay pagos pendientes por revisar.</p>
            </div>
        `;
    }

    return `
        <h2 class="mb-30">✅ Validación de Boletos</h2>
        <div class="module-card">
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
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
                        <td style="padding: 15px;">${b.cliente_info?.nombre || 'Anónimo'}</td>
                        <td style="padding: 15px;">${b.cliente_info?.telefono || '-'}</td>
                        <td style="padding: 15px;"><span class="badge badge-proceso">Pendiente</span></td>
                        <td style="padding: 15px;">
                            <button onclick="window.handleConfirm('${b.id}')" class="btn-sm btn-primary" style="background:#27ae60;">✓</button>
                            <button onclick="window.handleReject('${b.id}')" class="btn-sm btn-primary" style="background:#e74c3c;">✕</button>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}