import { getGlobalStats } from '../../../backend/services/admin.js';

export default async function Dashboard() {
    // Obtenemos estadísticas reales
    const stats = await getGlobalStats();

    return `
        <h2 class="page-title">📊 Resumen del Sistema</h2>
        
        <div class="stat-grid">
            <div class="stat-card card-primary">
                <p class="stat-title">Usuarios Totales</p>
                <h2 class="stat-value">${stats.users}</h2>
            </div>
            
            <div class="stat-card card-warning">
                <p class="stat-title">Boletos Pendientes</p>
                <h2 class="stat-value">${stats.pending}</h2>
            </div>
            
            <div class="stat-card card-danger">
                <p class="stat-title">Sorteos Activos</p>
                <h2 class="stat-value">${stats.activeSorteos}</h2>
            </div>
        </div>
        
        <div class="module-card">
            <h3 class="module-title">Estado del Servidor</h3>
            <p class="text-muted">🟢 Conectado a Supabase correctamente.</p>
        </div>
    `;
}