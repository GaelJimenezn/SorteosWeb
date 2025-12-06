export default function RaffleCard(s) {
    return `
    <div class="card">
        <div class="card-img-box">
            <img src="${s.imagen}" class="card-img" alt="${s.titulo}">
            <span class="card-badge">$${s.precio}</span>
        </div>
        <div class="card-body">
            <h3 class="text-primary mb-10">${s.titulo}</h3>
            <p class="text-muted text-small mb-20">${s.descripcion}</p>
            <div class="d-flex-between text-muted text-small mb-20">
                <span>📅 ${s.fecha}</span>
                <span>🏆 1er Premio</span>
            </div>
            <button onclick="window.openBuy()" class="btn-primary w-100">
                Conseguir Boleto
            </button>
        </div>
    </div>`;
}