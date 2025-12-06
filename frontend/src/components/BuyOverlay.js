import { getBoletos, reservarBoleto } from '../../../backend/services/data.js';

export async function openBuyOverlay(user) {
    const root = document.getElementById('modal-root');
    const boletos = await getBoletos();

    window.closeOverlay = () => root.innerHTML = '';

    // Renderizamos estructura base
    root.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-box">
                <button onclick="window.closeOverlay()" class="close-btn">&times;</button>
                <h3 class="text-center text-primary mb-10">Selecciona tu Boleto</h3>
                <p class="text-center text-muted mb-20">Elige manual o deja que la suerte decida</p>
                
                <div class="actions-grid mb-20">
                    <button onclick="window.renderGrid()" class="btn-outline w-100">🔢 Ver Todos</button>
                    <button onclick="window.pickRandom()" class="btn-primary w-100">🎲 Aleatorio</button>
                </div>

                <div id="grid-container" class="ticket-grid"></div>
            </div>
        </div>
    `;

    // Renderizar Grid
    window.renderGrid = () => {
        const container = document.getElementById('grid-container');
        container.innerHTML = boletos.map(b => {
            // Clases dinámicas en lugar de style
            const statusClass = b.estado === 'disponible' ? 'available' : 'taken';
            // Solo agrega onclick si está disponible
            const action = b.estado === 'disponible' ? `onclick="window.buy(${b.numero})"` : '';

            return `<button class="ticket-btn ${statusClass}" ${action}>
                ${b.numero.toString().padStart(2, '0')}
            </button>`;
        }).join('');
    };

    // Selección Aleatoria
    window.pickRandom = () => {
        const av = boletos.filter(b => b.estado === 'disponible');
        if (!av.length) return alert("Lo sentimos, boletos agotados.");
        const winner = av[Math.floor(Math.random() * av.length)];
        window.buy(winner.numero);
    };

    // Proceso de Compra
    window.buy = (num) => {
        const nombre = user ? user.nombre : prompt(`Ingresa tu nombre para apartar el boleto ${num}:`);
        if (nombre) {
            reservarBoleto(num, { nombre });
            alert(`¡Boleto ${num} apartado exitosamente!`);
            window.closeOverlay();
            location.reload();
        }
    };

    // Iniciar mostrando el grid
    window.renderGrid();
}