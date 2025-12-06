export default function FAQSection() {
    const faqs = [
        { q: "¿Cómo reporto mi pago?", a: "Al reservar tu boleto, el sistema te redirigirá automáticamente a WhatsApp para enviar tu comprobante." },
        { q: "¿Cuánto tiempo tengo para pagar?", a: "Tienes un lapso de 12 horas para enviar tu comprobante. De lo contrario, el boleto se libera." },
        { q: "¿Cómo sé si gané?", a: "Publicamos los resultados en nuestras redes y contactamos directamente a los ganadores por teléfono." }
    ];

    return `
    <section id="faq-contact-section" class="bg-light section-padding">
        <div class="page-container">
            <h2 class="text-center text-primary mb-50">Centro de Ayuda</h2>
            
            <div class="faq-contact-grid">
                <div>
                    <h3 class="mb-20">Preguntas Frecuentes</h3>
                    ${faqs.map(f => `
                        <details class="faq-item">
                            <summary class="faq-question">${f.q}</summary>
                            <p class="faq-answer">${f.a}</p>
                        </details>
                    `).join('')}
                </div>

                <div class="contact-card">
                    <h3 class="text-primary mb-10">¿Aún con dudas?</h3>
                    <p class="text-muted mb-20">Envíanos un mensaje directo.</p>
                    <form onsubmit="event.preventDefault(); alert('Mensaje enviado.');">
                        <label class="form-label">Nombre</label>
                        <input type="text" class="form-input" required>
                        <label class="form-label">Mensaje</label>
                        <textarea class="form-input form-textarea" required></textarea>
                        <button type="submit" class="btn-primary w-100">Enviar Consulta</button>
                    </form>
                </div>
            </div>
        </div>
    </section>`;
}