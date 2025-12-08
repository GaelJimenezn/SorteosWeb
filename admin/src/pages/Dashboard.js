import { activeSorteos, getPendientes } from '../../../backend/services/data.js';

export default function Dashboard() {
    const pendientes = getPendientes().length;
    const activos = activeSorteos.length;

    // Mock user count
    const usersCount = 142;
    const salesToday = 4500;

    return `
        <h2 class="mb-30">📊 Resumen del Sistema</h2>
        <div class="stat-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 4px solid var(--primary);">
                <p class="text-muted text-small">Boletos Vendidos</p>
                <h2 style="margin: 5px 0 0;">${usersCount}</h2>
            </div>
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 4px solid #27ae60;">
                <p class="text-muted text-small">Ventas Hoy</p>
                <h2 style="margin: 5px 0 0;">$${salesToday}</h2>
            </div>
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 4px solid #f39c12;">
                <p class="text-muted text-small">Por Validar</p>
                <h2 style="margin: 5px 0 0;">${pendientes}</h2>
            </div>
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 4px solid #e74c3c;">
                <p class="text-muted text-small">Sorteos Activos</p>
                <h2 style="margin: 5px 0 0;">${activos}</h2>
            </div>
        </div>
        
        <div class="module-card" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h3 class="mb-20">Actividad Reciente</h3>
            <p class="text-muted">El sistema está funcionando correctamente. No hay alertas críticas.</p>
        </div>
    `;
}
