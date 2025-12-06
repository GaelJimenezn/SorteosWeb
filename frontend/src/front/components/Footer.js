export default function Footer() {
    return `
    <footer class="mega-footer">
        <div class="page-container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>Sorteos UCQ</h4>
                    <ul>
                        <li><a href="#" onclick="document.getElementById('about-section').scrollIntoView({behavior: 'smooth'})">Historia y Valores</a></li>
                        <li><a href="#">Términos y Condiciones</a></li>
                        <li><a href="#">Política de Privacidad</a></li>
                        <li><a href="#">Reglamento de Sorteos</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>🔴 Transmisiones en Vivo</h4>
                    <p style="margin-bottom: 15px; font-size: 0.9rem;">Sigue los resultados en tiempo real todos los viernes a las 8:00 PM.</p>
                    <div class="social-icons">
                        <a href="https://facebook.com/live" target="_blank" class="social-btn" style="background: #1877F2;" title="Ver en Facebook Live">
                            F
                        </a>
                        <a href="https://youtube.com/live" target="_blank" class="social-btn" style="background: #FF0000;" title="Ver en YouTube">
                            Y
                        </a>
                    </div>
                </div>

                <div class="footer-col">
                    <h4>¿Necesitas Ayuda?</h4>
                    <p style="margin-bottom: 10px; font-size: 0.9rem;">Atención inmediata a participantes.</p>
                    <a href="https://wa.me/5214420000000" target="_blank" class="btn-primary" style="display: inline-block; padding: 8px 15px; background-color: #25D366; text-decoration: none; font-size: 0.85rem;">
                        💬 Chat de WhatsApp
                    </a>
                </div>

                <div class="footer-col">
                    <h4>Pagos Seguros</h4>
                    <p style="font-size: 0.8rem; color: #a0aab5;">Tus aportaciones son directas a la cuenta oficial.</p>
                    <div style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                        <span style="font-size: 1.2rem;">🔒 SSL Encrypted</span>
                    </div>
                </div>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; text-align: center; font-size: 0.8rem; opacity: 0.6;">
                © 2025 Universidad Cuauhtémoc Querétaro. Todos los derechos reservados.
            </div>
        </div>
    </footer>
    `;
}