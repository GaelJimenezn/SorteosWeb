import { getActiveSorteos, markSorteoAsFinished } from '../../../backend/services/sorteos.js';
import { getBoletosBySorteo } from '../../../backend/services/boletos.js';

export default async function Roulette() {
    const sorteos = await getActiveSorteos();

    // Logic for Circular Spin Wheel
    window.startGame = async () => {
        const sorteoId = document.getElementById('select-sorteo').value;
        const btn = document.getElementById('btn-start');
        const winnerLabel = document.getElementById('winner-label');
        const canvas = document.getElementById('wheel-canvas');

        if (!sorteoId) return alert("Selecciona un sorteo");

        btn.disabled = true;
        winnerLabel.innerText = "Cargando participantes...";

        // Traer boletos confirmados
        const todos = await getBoletosBySorteo(sorteoId);
        const confirmados = todos.filter(b => b.estado === 'confirmado' || b.estado === 'ocupado');

        if (confirmados.length === 0) {
            alert("Este sorteo no tiene boletos vendidos/confirmados aún.");
            btn.disabled = false;
            winnerLabel.innerText = "";
            return;
        }

        winnerLabel.innerText = "PREPARANDO...";

        // 1. CONFIGURACIÓN DEL CANVAS
        const ctx = canvas.getContext('2d');
        const size = 320; // Coincide con CSS
        canvas.width = size;
        canvas.height = size;
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2;

        // 2. PREPARAR SEGMENTOS
        let segments = [...confirmados];
        let winner = null;

        if (segments.length > 50) {
            winner = segments[Math.floor(Math.random() * segments.length)];
            const subset = [];
            for (let i = 0; i < 49; i++) {
                subset.push(segments[Math.floor(Math.random() * segments.length)]);
            }
            subset.push(winner);
            segments = subset;
            segments.sort(() => Math.random() - 0.5);
        } else {
            winner = segments[Math.floor(Math.random() * segments.length)];
        }

        const numSegments = segments.length;
        const arcSize = (2 * Math.PI) / numSegments;
        let winnerAngle = 0;

        // 3. DIBUJAR RUEDA
        segments.forEach((seg, i) => {
            const angle = i * arcSize;

            if (seg.id === winner.id) {
                winnerAngle = angle;
            }

            ctx.beginPath();
            ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + arcSize);
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            // Dibujar Texto (MEJORADO: Más grande y centrado)
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle + arcSize / 2);
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.font = "bold 16px Montserrat"; // Texto más grande
            ctx.fillText(seg.numero.toString(), radius - 15, 0); // Margen del borde
            ctx.restore();
        });

        // 4. ROTACIÓN
        const segmentCenter = winnerAngle + arcSize / 2;
        const segmentCenterDeg = segmentCenter * (180 / Math.PI);
        const extraSpins = 360 * 10;
        const targetRotation = extraSpins + (270 - segmentCenterDeg);

        canvas.style.transition = 'none';
        canvas.style.transform = `rotate(0deg)`;
        canvas.offsetHeight; // Force Reflow

        winnerLabel.innerText = "¡GIRANDO!";

        // 5. INICIAR GIRO
        canvas.style.transition = 'transform 6s cubic-bezier(0.1, 0.7, 0.1, 1)';
        canvas.style.transform = `rotate(${targetRotation}deg)`;

        // 6. FINALIZAR Y MOSTRAR GANADOR (Auto-Finish)
        setTimeout(async () => {
            // Marcar sorteo como finalizado en la BD
            console.log("🏁 Intentando finalizar sorteo...", sorteoId);
            const r = await markSorteoAsFinished(sorteoId, winner);

            if (!r.success) {
                console.error("❌ Falló al finalizar sorteo:", r.error);
                alert("Hubo un error al registrar el ganador en la base de datos. Por favor revisa la consola.");
            } else {
                console.log("✅ Sorteo finalizado con éxito.");
            }

            // Mostrar Tarjeta de Ganador
            const cliente = winner.cliente_info || {};
            const nombreGanador = cliente.nombre || 'Desconocido';
            const telGanador = cliente.telefono || '---';
            const ciudadGanador = cliente.ciudad || '---';
            const estadoGanador = cliente.estado || '---';

            winnerLabel.innerHTML = ''; // Limpiar texto simple

            const cardHtml = `
                <div class="winner-card" style="animation: fadeIn 1s forwards;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">🎉</div>
                    <h3 style="color: var(--color-success); margin-bottom: 5px;">¡TENEMOS GANADOR!</h3>
                    <div style="font-size: 1.5rem; font-weight: 800; margin: 10px 0;">${nombreGanador}</div>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: left; margin-top: 15px;">
                        <p><strong>🎟️ Boleto:</strong> #${winner.numero}</p>
                        <p><strong>📞 Teléfono:</strong> ${telGanador}</p>
                        <p><strong>📍 Ubicación:</strong> ${ciudadGanador}, ${estadoGanador}</p>
                    </div>
                    <p style="margin-top: 15px; color: var(--text-muted); font-size: 0.9rem;">
                        El sorteo ha sido finalizado automáticamente.
                    </p>
                </div>
             `;

            winnerLabel.innerHTML = cardHtml;
            confettiEffect();
        }, 6000);
    };

    const confettiEffect = () => {
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
        for (let i = 0; i < 150; i++) {
            const div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.left = Math.random() * 100 + 'vw';
            div.style.top = '-10px';
            div.style.width = '10px';
            div.style.height = '10px';
            div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            div.style.transition = `top ${Math.random() * 2 + 1}s ease-out, transform 2s linear`;
            div.style.zIndex = '9999';
            document.body.appendChild(div);
            setTimeout(() => {
                div.style.top = '100vh';
                div.style.transform = `rotate(${Math.random() * 360}deg)`;
            }, 100);
            setTimeout(() => div.remove(), 3000);
        }
    };

    return `
        <div class="winners-container" style="background:transparent; box-shadow:none; padding:0;">
            <h2 class="page-title text-center" style="margin-bottom: 30px;">🎰 Ruleta de la Suerte</h2>
            
            <div class="form-group text-center" style="max-width: 400px; margin: 0 auto 30px auto;">
                <label class="form-label">Seleccionar Sorteo:</label>
                <select id="select-sorteo" class="form-select">
                    ${sorteos.map(s => `<option value="${s.id}">${s.titulo}</option>`).join('')}
                </select>
            </div>

            <div class="roulette-container">
                <div class="wheel-wrapper">
                    <div class="wheel-pointer"></div>
                    <canvas id="wheel-canvas"></canvas>
                </div>
            </div>
            
            <!-- Contenedor para el resultado final -->
            <div id="winner-label" style="min-height: 40px; margin-top: 20px; text-align: center;"></div>
            
            <div class="text-center" style="margin-top: 20px;">
                <button id="btn-start" onclick="window.startGame()" class="btn btn-primary" style="padding: 15px 50px; font-size: 1.2rem;">
                    GIRAR
                </button>
            </div>
        </div>
    `;
}