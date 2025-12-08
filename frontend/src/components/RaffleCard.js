export default function RaffleCard(s) {
    return `
    <div class="card raffle-card" onclick="location.hash='#/sorteo/${s.id}'" style="cursor: pointer; transition: transform 0.2s;">
        <div class="card-img-box">
            <img src="${s.imagen_portada || 'https://via.placeholder.com/500'}" class="card-img" alt="${s.titulo}">
            <span class="card-badge">$${s.precio}</span>
        </div>
        <div class="card-body">
            <h3 class="text-primary mb-10">${s.titulo}</h3>
            <p class="text-muted text-small mb-20" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${s.descripcion}</p>
            <div class="d-flex-between text-muted text-small mb-20">
                <span>📅 ${s.fecha_sorteo}</span>
                <span>🏆 1er Premio</span>
            </div>
            <button class="btn-primary w-100">
                Ver Detalles
            </button>
        </div>
    </div>`;
}