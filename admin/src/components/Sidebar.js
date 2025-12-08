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
        <aside class="sidebar" style="width: 250px; background: #1a1a2e; color: white; display: flex; flex-direction: column; height: 100vh; position: fixed; left: 0; top: 0;">
            <div style="padding: 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <h3 style="color: var(--accent); margin: 0;">Panel Admin</h3>
            </div>
            
            <nav style="flex: 1; padding: 20px;">
                ${navItems.map(item => `
                    <div 
                        class="nav-item ${currentModule === item.id ? 'active' : ''}" 
                        onclick="window.switchModule('${item.id}')"
                        style="
                            padding: 12px 15px; 
                            cursor: pointer; 
                            border-radius: 8px; 
                            margin-bottom: 8px; 
                            transition: 0.2s;
                            background: ${currentModule === item.id ? 'rgba(255,255,255,0.1)' : 'transparent'};
                            color: ${currentModule === item.id ? 'var(--accent)' : 'inherit'};
                            display: flex;
                            align-items: center;
                            gap: 10px;
                        "
                        onmouseover="this.style.background='rgba(255,255,255,0.05)'"
                        onmouseout="this.style.background='${currentModule === item.id ? 'rgba(255,255,255,0.1)' : 'transparent'}'"
                    >
                        <span>${item.icon}</span>
                        <span>${item.label}</span>
                    </div>
                `).join('')}
            </nav>

            <div style="padding: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                <div 
                    class="nav-item" 
                    onclick="window.adminLogout()" 
                    style="cursor: pointer; color: #e74c3c; display: flex; align-items: center; gap: 10px; padding: 10px;"
                >
                    <span>🚪</span>
                    <span>Cerrar Sesión</span>
                </div>
            </div>
        </aside>
    `;
}
