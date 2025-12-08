export default function Settings() {
    return `
        <h2 class="mb-30">⚙️ Configuración</h2>
        <div class="module-card mb-30" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 30px;">
            <h3 class="mb-20">Redes Sociales</h3>
            <div style="margin-bottom: 15px;"><label style="display:block; font-weight:bold;">Facebook</label><input type="text" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="https://facebook.com/sorteosucq"></div>
            <div style="margin-bottom: 15px;"><label style="display:block; font-weight:bold;">Instagram</label><input type="text" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="https://instagram.com/sorteosucq"></div>
            <div style="margin-bottom: 15px;"><label style="display:block; font-weight:bold;">X (Twitter)</label><input type="text" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="https://x.com/sorteosucq"></div>
        </div>
        
        <div class="module-card" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h3 class="mb-20">Preguntas Frecuentes (FAQs)</h3>
            <p class="text-muted">Aquí se gestionarán las preguntas frecuentes.</p>
            <div style="padding: 10px; background: #f8f9fa; border: 1px dashed #ccc; text-align: center; margin-top: 10px;">
                + Agregar Nueva Pregunta
            </div>
        </div>
    `;
}
