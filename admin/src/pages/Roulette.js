import { getActiveSorteos } from '../../../backend/services/sorteos.js';
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
        // Para que se vea "tupido" pero legible, limitamos visualmente si son demasiados,
        // pero aseguramos que el ganador esté ahí.
        let segments = [...confirmados];

        // Si hay muchos, tomamos una muestra aleatoria de 50 + el ganador
        let winner = null;
        if (segments.length > 50) {
            winner = segments[Math.floor(Math.random() * segments.length)];
            const subset = [];
            for (let i = 0; i < 49; i++) {
                subset.push(segments[Math.floor(Math.random() * segments.length)]);
            }
            subset.push(winner);
            segments = subset;
            // Mezclar para que el ganador no quede siempre al final
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

            // Guardar ángulo del ganador
            // Nota: El puntero está arriba (270 grados / -90 grados).
            // La rotación final deberá alinear este segmento con la parte superior.
            if (seg.id === winner.id) {
                winnerAngle = angle;
            }

            ctx.beginPath();
            ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + arcSize);
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            // Dibujar Texto (Número)
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle + arcSize / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "white";
            ctx.font = "bold 12px Montserrat";
            ctx.fillText(seg.numero.toString(), radius - 10, 5);
            ctx.restore();
        });

        // 4. CALCULAR ROTACIÓN FINAL
        // Queremos que el segmento ganador quede arriba (a -90 grados o 270 grados)
        // La posición actual del ganador en el canvas sin rotar es: winnerAngle + arcSize/2
        // Meta: RotatingCanvas + (winnerAngle + arcSize/2) = 270 degrees (3*PI/2)
        // RotatingCanvas = 270 - (winnerAngle + arcSize/2)
        // Añadimos muchas vueltas completas (e.g. 5 * 360) para efecto de giro.

        const segmentCenter = winnerAngle + arcSize / 2;
        // Convertimos a grados para CSS transform
        const segmentCenterDeg = segmentCenter * (180 / Math.PI);

        // El puntero está arriba (270° en círculo trigonométrico estándar partiendo de derecha=0)
        // Queremos que (Rotation + SegmentCenter) % 360 == 270
        // Rotation = 270 - SegmentCenter
        // Ajuste extra para asegurar muchas vueltas positivas
        const extraSpins = 360 * 10; // 10 vueltas
        const targetRotation = extraSpins + (270 - segmentCenterDeg);

        // Reset transform
        canvas.style.transition = 'none';
        canvas.style.transform = `rotate(0deg)`;

        // Force reflow
        canvas.offsetHeight;

        winnerLabel.innerText = "¡GIRANDO!";

        // 5. INICIAR GIRO
        canvas.style.transition = 'transform 6s cubic-bezier(0.1, 0.7, 0.1, 1)';
        canvas.style.transform = `rotate(${targetRotation}deg)`;

        // 6. FINALIZAR
        setTimeout(() => {
            winnerLabel.innerHTML = `🎉 GANADOR: <strong>${winner.cliente_info?.nombre || 'Anónimo'}</strong>`;
            winnerLabel.classList.add('winner-highlight');
            btn.disabled = false;
            confettiEffect();
        }, 6000);
    };

    const confettiEffect = () => {
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
        for (let i = 0; i < 100; i++) {
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
            
            <div id="winner-label" style="min-height: 40px; font-size: 1.5rem; margin-top: 20px; text-align:center; font-weight: bold; color: #F59E0B; text-transform: uppercase;"></div>
            
            <div class="text-center" style="margin-top: 20px;">
                <button id="btn-start" onclick="window.startGame()" class="btn btn-primary" style="padding: 15px 50px; font-size: 1.2rem;">
                    GIRAR
                </button>
            </div>
        </div>
    `;
}