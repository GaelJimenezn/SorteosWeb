import { getBoletosBySorteo, reservarBoleto } from '../../../backend/services/boletos.js';

export async function openBuyOverlay(user, sorteoId) {
    console.log(`🔵 [Overlay] Abriendo compra para sorteo ID: ${sorteoId}`);
    const root = document.getElementById('modal-root');

    // Cargar boletos reales de la DB
    const boletos = await getBoletosBySorteo(sorteoId);

    window.closeOverlay = () => {
        root.innerHTML = '';
        console.log("⚪ [Overlay] Cerrado");
    };

    root.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-box" style="max-width: 800px;">
                <button onclick="window.closeOverlay()" class="close-btn">&times;</button>
                <h3 class="text-center text-primary mb-10">Selecciona tu Boleto</h3>
                <p class="text-center text-muted mb-20">Sorteo ID: ...${sorteoId.slice(-4)}</p>
                
                <div class="actions-grid mb-20">
                    <button onclick="window.pickRandom()" class="btn-primary w-100">🎲 Aleatorio</button>
                </div>

                <div id="grid-container" class="ticket-grid">
                    Cargando boletos...
                </div>
            </div>
        </div>
    `;

    // Render Grid
    const container = document.getElementById('grid-container');
    if (boletos.length === 0) {
        container.innerHTML = "<p>No se encontraron boletos. ¿Ya ejecutaste el script SQL?</p>";
    } else {
        container.innerHTML = boletos.map(b => {
            const statusClass = b.estado === 'disponible' ? 'available' : 'taken';
            const action = b.estado === 'disponible' ? `onclick="window.buy(${b.numero})"` : 'disabled';

            return `<button class="ticket-btn ${statusClass}" ${action}>
                ${b.numero.toString().padStart(2, '0')}
            </button>`;
        }).join('');
    }

    // Logic Compra
    window.buy = async (num) => {
        console.log(`🖱️ [Click] Usuario quiere boleto ${num}`);

        let clientData = null;
        if (!user) {
            const nombre = prompt("Para apartar, ingresa tu nombre:");
            const tel = prompt("Ingresa tu teléfono:");
            if (!nombre || !tel) return;
            clientData = { nombre, telefono: tel };
        } else {
            // Si está logueado, tomamos sus datos del perfil (opcional, o solo mandamos ID)
            clientData = { nombre: user.nombre || user.email };
        }

        const result = await reservarBoleto(num, sorteoId, user ? user.id : null, clientData);

        if (result.success) {
            alert(`¡Boleto ${num} apartado con éxito!`);
            window.closeOverlay();
            // Recargar para ver cambios (podrías optimizar para no recargar toda la página)
            location.reload();
        } else {
            alert(`Error: ${result.message}`);
        }
    };

    // Logic Random
    window.pickRandom = () => {
        const disponibles = boletos.filter(b => b.estado === 'disponible');
        if (disponibles.length === 0) return alert("Agotado.");
        const random = disponibles[Math.floor(Math.random() * disponibles.length)];
        window.buy(random.numero);
    };
}