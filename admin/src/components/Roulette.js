import { getConfirmados } from '../../../backend/services/data.js';

export default function Roulette() {
    const mount = document.getElementById('roulette-mount');

    mount.innerHTML = `
        <div class="panel-card roulette-box">
            <h3 class="panel-header">🎰 Sorteo Final</h3>
            <div id="r-display" class="roulette-number">00</div>
            <div id="r-winner" class="winner-text"></div>
            <button id="btn-spin" class="btn-primary" style="width:100%;">GIRAR RULETA</button>
        </div>
    `;

    document.getElementById('btn-spin').onclick = () => {
        const parts = getConfirmados();
        if (parts.length === 0) return alert("No hay participantes confirmados.");

        const display = document.getElementById('r-display');
        const winnerTxt = document.getElementById('r-winner');
        const btn = document.getElementById('btn-spin');

        btn.disabled = true;
        winnerTxt.innerText = "Girando...";

        let cycles = 0;
        let speed = 50;

        const loop = () => {
            const random = parts[Math.floor(Math.random() * parts.length)];
            display.innerText = random.numero.toString().padStart(2, '0');

            if (cycles < 30) {
                cycles++;
                if (cycles > 20) speed += 30; // Efecto frenado
                setTimeout(loop, speed);
            } else {
                winnerTxt.innerText = `🏆 ${random.cliente.nombre}`;
                btn.disabled = false;
                alert(`¡Ganador: ${random.cliente.nombre}!`);
            }
        };
        loop();
    };
}