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
            <table class="data-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${pendientes.map(b => `
                    <tr>
                        <td style="font-weight:bold;">${b.numero}</td>
                        <td>${b.cliente_info?.nombre || 'Anónimo'}</td>
                        <td>${b.cliente_info?.telefono || '-'}</td>
                        <td><span class="badge badge-proceso">Pendiente</span></td>
                        <td>
                            <button onclick="window.handleConfirm('${b.id}')" class="btn-sm btn-primary" style="background:#27ae60;">✓</button>
                            <button onclick="window.handleReject('${b.id}')" class="btn-sm btn-primary" style="background:#e74c3c;">✕</button>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}