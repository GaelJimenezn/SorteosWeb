import { activeSorteos, getPendientes } from '../../../backend/services/data.js';

export default function Dashboard() {
    const pendientes = getPendientes().length;
    const activos = activeSorteos.length;

    // Mock user count
    const usersCount = 142;
    const salesToday = 4500;

    return `
        <h2 class="page-title">📊 Resumen del Sistema</h2>
        
        <div class="stat-grid">
            <div class="stat-card card-primary">
                <p class="stat-title">Boletos Vendidos</p>
                <h2 class="stat-value">${usersCount}</h2>
            </div>
            
            <div class="stat-card card-success">
                <p class="stat-title">Ventas Hoy</p>
                <h2 class="stat-value">$${salesToday}</h2>
            </div>
            
            <div class="stat-card card-warning">
                <p class="stat-title">Por Validar</p>
                <h2 class="stat-value">${pendientes}</h2>
            </div>
            
            <div class="stat-card card-danger">
                <p class="stat-title">Sorteos Activos</p>
                <h2 class="stat-value">${activos}</h2>
            </div>
        </div>
        
        <div class="module-card">
            <h3 class="module-title">Actividad Reciente</h3>
            <p class="text-muted">El sistema está funcionando correctamente. No hay alertas críticas.</p>
        </div>
    `;
}
