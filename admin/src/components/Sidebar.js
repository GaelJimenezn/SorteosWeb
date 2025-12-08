export default function Sidebar(currentModule) {
    const navItems = [
        { id: 'dashboard', icon: '📊', label: 'Resumen' },
        { id: 'sorteos', icon: '🎟️', label: 'Sorteos' },
        { id: 'validation', icon: '✅', label: 'Validación' },
        { id: 'roulette', icon: '🎰', label: 'Realizar Sorteo' },
        { id: 'winners', icon: '🏆', label: 'Ganadores' },
        { id: 'settings', icon: '⚙️', label: 'Configuración' }
    ];

    return `
        <aside class="sidebar-container">
            <div class="sidebar-header">
                <h3 class="sidebar-title">Panel Admin</h3>
            </div>
            
            <nav class="nav-links">
                ${navItems.map(item => `
                    <div 
                        class="nav-item ${currentModule === item.id ? 'active' : ''}" 
                        onclick="window.switchModule('${item.id}')"
                    >
                        <span class="nav-icon">${item.icon}</span>
                        <span class="nav-label">${item.label}</span>
                    </div>
                `).join('')}
            </nav>

            <div class="logout-section">
                <div 
                    class="logout-btn" 
                    onclick="window.adminLogout()"
                >
                    <span>🚪</span>
                    <span>Cerrar Sesión</span>
                </div>
            </div>
        </aside>
    `;
}
