import { faqs } from '../../services/data.js';

export default function FAQSection() {
    const items = faqs.map(f => `
        <div style="border-bottom: 1px solid #eee; padding: 15px 0;">
            <h4 style="color: var(--primary); margin-bottom: 5px;">${f.q}</h4>
            <p style="color: #555; font-size: 0.95rem;">${f.a}</p>
        </div>
    `).join('');

    return `
    <section class="page-container" style="padding: 60px 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px;">
            <div>
                <h3 style="font-size: 1.8rem; color: var(--primary); margin-bottom: 20px;">Dudas Frecuentes</h3>
                ${items}
            </div>
            <div style="background: var(--bg-body); border: 1px solid #eee; padding: 30px; border-radius: 8px;">
                <h3 style="color: var(--primary);">¿Necesitas ayuda directa?</h3>
                <p style="margin: 15px 0; color: #666;">Si tienes problemas con tu pago o registro, escríbenos.</p>
                <button class="btn-primary" style="background-color: #25D366;">WhatsApp Oficial</button>
            </div>
        </div>
    </section>
    `;
}