export default function TicketModal(numero) {
    const root = document.getElementById('modal-root');

    root.innerHTML = `
        <div style="position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(16, 48, 86, 0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(4px);">
            <div style="background: white; padding: 40px; border-radius: 8px; width: 90%; max-width: 450px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: fadeInUp 0.3s ease;">
                <h2 style="color: var(--primary); margin-bottom: 5px;">Boleto #${numero.toString().padStart(2, '0')}</h2>
                <p style="color: #666; margin-bottom: 25px;">Ingresa tus datos para apartar este número.</p>
                
                <form id="reserva-form">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; color: var(--primary); font-weight: 600; margin-bottom: 5px;">Nombre Completo</label>
                        <input type="text" required style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; font-family: inherit;">
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <label style="display: block; color: var(--primary); font-weight: 600; margin-bottom: 5px;">Teléfono / WhatsApp</label>
                        <input type="tel" required style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; font-family: inherit;">
                    </div>
                    
                    <button type="submit" class="btn-primary" style="width: 100%;">Apartar Boleto</button>
                    <button type="button" id="close-modal" style="width: 100%; margin-top: 15px; background: none; border: none; color: #888; cursor: pointer; text-decoration: underline;">Cancelar</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('close-modal').onclick = () => root.innerHTML = '';

    document.getElementById('reserva-form').onsubmit = (e) => {
        e.preventDefault();
        alert(`¡Excelente! El boleto #${numero} ha sido apartado. Te contactaremos.`);
        root.innerHTML = '';
        // Aquí iría la llamada a Supabase más adelante
    };
}