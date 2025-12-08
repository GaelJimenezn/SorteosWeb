import { getActiveSorteos } from '../../../backend/services/sorteos.js';
import { getBoletosBySorteo } from '../../../backend/services/boletos.js';

export default async function Roulette() {
    const sorteos = await getActiveSorteos();

    // Lógica para iniciar el juego
    window.startGame = async () => {
        const sorteoId = document.getElementById('select-sorteo').value;
        const btn = document.getElementById('btn-start');
        const display = document.getElementById('roulette-display');
        const winnerLabel = document.getElementById('winner-label');

        if (!sorteoId) return alert("Selecciona un sorteo");

        btn.disabled = true;
        winnerLabel.innerText = "Cargando participantes...";

        // Traer boletos confirmados de la DB
        const todos = await getBoletosBySorteo(sorteoId);
        const confirmados = todos.filter(b => b.estado === 'confirmado' || b.estado === 'ocupado');

        if (confirmados.length === 0) {
            alert("Este sorteo no tiene boletos vendidos/confirmados aún.");
            btn.disabled = false;
            winnerLabel.innerText = "";
            return;
        }

        // Animación de Ruleta
        winnerLabel.innerText = "Girando...";
        let cycles = 0;
        let speed = 50;

        const loop = () => {
            // Elegir uno al azar visualmente
            const random = confirmados[Math.floor(Math.random() * confirmados.length)];
            display.innerText = random.numero.toString().padStart(2, '0');

            if (cycles < 40) { // Duración del giro
                cycles++;
                if (cycles > 30) speed += 20; // Efecto frenado
                setTimeout(loop, speed);
            } else {
                // GANADOR FINAL
                const winner = confirmados[Math.floor(Math.random() * confirmados.length)];
                display.innerText = winner.numero.toString().padStart(2, '0');
                winnerLabel.innerText = `🎉 Ganador: ${winner.cliente_info?.nombre || 'Anónimo'} (Tel: ${winner.cliente_info?.telefono || 'N/A'})`;
                display.style.color = '#e74c3c'; // Rojo festivo
                btn.disabled = false;
                // Aquí podrías agregar lógica para guardar el ganador en la DB si quisieras
            }
        };
        loop();
    };

    return `
        <h2 class="mb-30">🎰 Realizar Sorteo</h2>
        <div class="module-card text-center" style="max-width: 600px; margin: 0 auto;">
            
            <div style="margin-bottom: 30px;">
                <label style="display:block; margin-bottom:10px; font-weight:bold;">Seleccionar Sorteo a Jugar:</label>
                <select id="select-sorteo" class="form-input" style="max-width: 300px; margin: 0 auto;">
                    ${sorteos.map(s => `<option value="${s.id}">${s.titulo}</option>`).join('')}
                </select>
            </div>

            <div style="background: #f8f9fa; padding: 40px; border-radius: 20px; border: 4px solid var(--primary);">
                <div id="roulette-display" style="font-size: 5rem; font-weight: 800; color: var(--primary); font-family: monospace;">00</div>
                <div id="winner-label" style="height: 30px; margin-top: 10px; font-weight: bold; color: var(--accent);"></div>
            </div>
            
            <button id="btn-start" onclick="window.startGame()" class="btn-primary" style="margin-top: 30px; padding: 15px 40px; font-size: 1.2rem;">
                🎲 GIRAR RULETA
            </button>
        </div>
    `;
}