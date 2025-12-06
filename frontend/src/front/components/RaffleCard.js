export default function RaffleCard(sorteo) {
    // Diseño tipo tarjeta vertical con imagen arriba y botón abajo
    return `
    <div class="raffle-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.05); transition: transform 0.3s;">
        <div style="height: 200px; background: #eee; position: relative;">
            <img src="${sorteo.imagen || 'https://via.placeholder.com/400x200?text=Sorteo+UCQ'}" style="width: 100%; height: 100%; object-fit: cover;">
            <span style="position: absolute; top: 15px; right: 15px; background: var(--accent); color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">
                $${sorteo.precio} MXN
            </span>
        </div>

        <div style="padding: 20px;">
            <h3 style="color: var(--primary); margin-bottom: 10px;">${sorteo.titulo}</h3>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px; height: 40px; overflow: hidden;">${sorteo.descripcion}</p>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 0.85rem; color: #888;">
                <span>📅 ${sorteo.fecha}</span>
                <span>🏆 1er Premio</span>
            </div>

            <button onclick="window.openBuy()" class="btn-primary" style="width: 100%; text-align: center; display: block;">
                🎟️ CONSEGUIR BOLETOS
            </button>
        </div>
    </div>
    `;
}