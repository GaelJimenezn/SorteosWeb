import TicketModal from './TicketModal.js';

export function renderTicketGrid(boletos, filter = 'todos') {
    const grid = document.getElementById('grid-container');
    grid.innerHTML = '';

    const filtrados = boletos.filter(b => filter === 'todos' ? true : b.estado === filter);

    if (filtrados.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No hay boletos disponibles con este filtro.</p>';
        return;
    }

    filtrados.forEach(boleto => {
        const btn = document.createElement('button');
        const numPad = boleto.numero.toString().padStart(2, '0');

        // Estilos dinámicos JS -> CSS
        let bg = 'white';
        let color = 'var(--primary)';
        let border = '2px solid #eee';
        let cursor = 'pointer';

        if (boleto.estado === 'ocupado') {
            bg = '#eee'; color = '#aaa'; cursor = 'not-allowed';
        } else if (boleto.estado === 'disponible') {
            border = '2px solid var(--primary)';
        }

        btn.className = `ticket-item animate`;
        btn.style.cssText = `
            background: ${bg}; color: ${color}; border: ${border}; cursor: ${cursor};
            border-radius: var(--radius); padding: 15px; display: flex; flex-direction: column; align-items: center;
            transition: 0.2s; font-family: var(--font-main);
        `;

        btn.innerHTML = `
            <span style="font-size: 1.5rem; font-weight: 800;">${numPad}</span>
            <span style="font-size: 0.6rem; text-transform: uppercase; margin-top: 5px;">${boleto.estado}</span>
        `;

        // Solo permitir clic si está disponible
        if (boleto.estado === 'disponible') {
            btn.onclick = () => TicketModal(boleto.numero);

            // Hover effect manual
            btn.onmouseenter = () => { btn.style.background = 'var(--primary)'; btn.style.color = 'white'; };
            btn.onmouseleave = () => { btn.style.background = 'white'; btn.style.color = 'var(--primary)'; };
        }

        grid.appendChild(btn);
    });
}