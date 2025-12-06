import { getBoletos, validarBoleto, getConfirmados } from '../services/data.js';

// Renderizar tabla
async function renderTabla() {
    const boletos = await getBoletos();
    // Mostrar solo los que tienen actividad (proceso o confirmado)
    const activos = boletos.filter(b => b.estado !== 'disponible');

    const tbody = document.getElementById('lista-boletos');
    tbody.innerHTML = activos.map(b => `
        <tr style="border-bottom: 1px solid #eee; height: 50px;">
            <td><strong>${b.numero}</strong></td>
            <td>${b.cliente.nombre}<br><small>${b.cliente.telefono}</small></td>
            <td><span style="padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; background: ${b.estado === 'confirmado' ? '#d4edda' : '#fff3cd'}">${b.estado.toUpperCase()}</span></td>
            <td>
                ${b.estado === 'proceso'
            ? `<button onclick="window.confirmarPago(${b.numero})" style="cursor: pointer; background: var(--primary); color: white; border: none; padding: 5px 10px; border-radius: 4px;">✔ Validar</button>`
            : '-'}
            </td>
        </tr>
    `).join('');
}

// Validar Pago (Botón de Acción)
window.confirmarPago = (numero) => {
    if (confirm(`¿Validar pago del boleto ${numero}?`)) {
        validarBoleto(numero);
        renderTabla(); // Refrescar tabla
        alert("Boleto confirmado exitosamente.");
    }
};

// Lógica de Ruleta (Tipo Casino)
document.getElementById('btn-spin').onclick = () => {
    const participantes = getConfirmados();
    const display = document.getElementById('roulette-display');
    const winnerLabel = document.getElementById('winner-name');
    const btn = document.getElementById('btn-spin');

    if (participantes.length === 0) {
        alert("No hay boletos confirmados para sortear.");
        return;
    }

    btn.disabled = true;
    winnerLabel.innerText = "Girando...";

    let cycles = 0;
    let speed = 50;

    const spin = () => {
        // Seleccionar aleatorio visualmente
        const randomInfo = participantes[Math.floor(Math.random() * participantes.length)];
        display.innerText = randomInfo.numero.toString().padStart(2, '0');

        if (cycles < 30) {
            cycles++;
            if (cycles > 20) speed += 30; // Efecto frenado
            setTimeout(spin, speed);
        } else {
            // GANADOR DEFINITIVO
            display.style.color = "var(--primary)";
            display.style.transform = "scale(1.2)";
            winnerLabel.innerText = `🏆 ${randomInfo.cliente.nombre}`;
            btn.disabled = false;
            alert(`¡Felicidades! El ganador es ${randomInfo.cliente.nombre} con el boleto ${randomInfo.numero}`);
        }
    };
    spin();
};

// Inicializar
renderTabla();