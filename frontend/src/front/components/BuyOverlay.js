import { getBoletos, reservarBoleto } from '../../services/data.js';

export async function openBuyOverlay(usuarioLogueado) {
    const root = document.getElementById('modal-root');
    const boletos = await getBoletos();

    // Función para cerrar
    window.closeOverlay = () => root.innerHTML = '';

    // HTML de la Pantalla de Selección
    const renderSelectionScreen = () => `
        <div class="overlay-full">
            <div class="overlay-content">
                <div class="overlay-header">
                    <h3 style="color: var(--primary);">Consigue tus Boletos</h3>
                    <button onclick="window.closeOverlay()" style="background:none; border:none; font-size: 1.5rem; cursor:pointer;">&times;</button>
                </div>
                <div class="overlay-body">
                    <h2 style="color: var(--primary); margin-bottom: 10px;">¿Cómo quieres participar?</h2>
                    <p>Elige tu número de la suerte o deja que el destino decida.</p>
                    
                    <div class="selection-mode">
                        <div class="mode-card" onclick="window.showGrid()">
                            <span class="mode-icon">🔢</span>
                            <h4>Elegir Manualmente</h4>
                            <p style="font-size: 0.9rem; color: #666;">Selecciona tu número favorito del tablero.</p>
                        </div>

                        <div class="mode-card" onclick="window.generateRandom()">
                            <span class="mode-icon">🎲</span>
                            <h4>Máquina de la Suerte</h4>
                            <p style="font-size: 0.9rem; color: #666;">Generar un número aleatorio disponible.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    root.innerHTML = renderSelectionScreen();

    // LÓGICA INTERNA

    // A. Mostrar Grid (Manual)
    window.showGrid = () => {
        const body = document.querySelector('.overlay-body');
        body.innerHTML = `
            <button onclick="window.openBuyOverlay()" style="align-self: flex-start; margin-bottom: 20px; background:none; border:none; color: var(--primary); cursor:pointer;">← Volver</button>
            <h3 style="margin-bottom: 20px;">Selecciona un número disponible</h3>
            <div class="grid-overlay">
                ${boletos.map(b => {
            const statusClass = b.estado === 'disponible' ? 'status-disponible' : 'status-ocupado';
            const action = b.estado === 'disponible' ? `onclick="window.processCompra(${b.numero})"` : '';
            // Usamos status-ocupado para ocupado y confirmado
            const finalClass = (b.estado === 'ocupado' || b.estado === 'confirmado') ? 'status-ocupado' : statusClass;

            return `<div class="ticket-card ${finalClass}" ${action} style="font-size: 1.2rem;">${b.numero.toString().padStart(2, '0')}</div>`;
        }).join('')}
            </div>
        `;
    };

    // B. Generar Random
    window.generateRandom = () => {
        const disponibles = boletos.filter(b => b.estado === 'disponible');
        if (disponibles.length === 0) return alert("Lo sentimos, no quedan boletos.");

        const body = document.querySelector('.overlay-body');
        body.innerHTML = `<h2 style="margin-top: 50px;">Buscando tu suerte... 🎰</h2>`;

        setTimeout(() => {
            const elegido = disponibles[Math.floor(Math.random() * disponibles.length)];
            window.processCompra(elegido.numero);
        }, 1500);
    };

    // C. Procesar Compra
    window.processCompra = (numero) => {
        if (usuarioLogueado) {
            if (confirm(`Hola ${usuarioLogueado.nombre}, ¿quieres apartar el boleto ${numero}?`)) {
                reservarBoleto(numero, usuarioLogueado);
                alert("¡Apartado! Revisa tu perfil.");
                window.closeOverlay();
                location.reload();
            }
        } else {
            const body = document.querySelector('.overlay-body');
            body.innerHTML = `
                <h3>Apartando Boleto #${numero}</h3>
                <p>Necesitamos tus datos para contactarte si ganas.</p>
                <form id="quick-register" style="max-width: 300px; width: 100%; margin-top: 20px;">
                    <input type="text" id="q-nombre" placeholder="Nombre" required style="width:100%; padding:10px; margin-bottom:10px; border: 1px solid #ddd;">
                    <input type="tel" id="q-tel" placeholder="Teléfono" required style="width:100%; padding:10px; margin-bottom:10px; border: 1px solid #ddd;">
                    <input type="email" id="q-email" placeholder="Email" required style="width:100%; padding:10px; margin-bottom:20px; border: 1px solid #ddd;">
                    <button type="submit" class="btn-primary" style="width:100%;">Confirmar Reserva</button>
                </form>
            `;

            setTimeout(() => { // Esperar a que se renderice el form
                document.getElementById('quick-register').onsubmit = (e) => {
                    e.preventDefault();
                    const datos = {
                        nombre: document.getElementById('q-nombre').value,
                        telefono: document.getElementById('q-tel').value,
                        email: document.getElementById('q-email').value
                    };
                    reservarBoleto(numero, datos);

                    // Redirección WhatsApp
                    const msg = `Hola, aparté el boleto ${numero}. Soy ${datos.nombre}.`;
                    window.open(`https://wa.me/5214420000000?text=${encodeURIComponent(msg)}`, '_blank');

                    window.closeOverlay();
                    location.reload();
                };
            }, 100);
        }
    };

    // Necesario para que el botón "Volver" funcione, ya que llama a window.openBuyOverlay
    window.openBuyOverlay = () => openBuyOverlay(usuarioLogueado);
}