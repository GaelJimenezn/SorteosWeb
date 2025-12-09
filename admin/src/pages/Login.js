import { supabase } from '../../../backend/services/supabase.js';

export default function Login() {
    const render = () => `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: var(--admin-bg);">
            <div class="module-card" style="width: 100%; max-width: 400px; text-align: center;">
                <div style="margin-bottom: 30px;">
                    <h1 style="color: var(--text-dark); margin-bottom: 10px;">Admin Panel</h1>
                    <p class="text-muted">Ingresa tus credenciales</p>
                </div>

                <form id="login-form">
                    <div style="margin-bottom: 20px; text-align: left;">
                        <label style="display: block; margin-bottom: 8px; font-weight: bold; color: var(--text-dark);">Email</label>
                        <input type="email" id="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; outline: none;">
                    </div>

                    <div style="margin-bottom: 30px; text-align: left;">
                        <label style="display: block; margin-bottom: 8px; font-weight: bold; color: var(--text-dark);">Contraseña</label>
                        <input type="password" id="password" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; outline: none;">
                    </div>

                    <button type="submit" id="login-btn" class="btn btn-primary" style="width: 100%; justify-content: center;">
                        Ingresar
                    </button>

                    <p id="error-msg" style="color: var(--color-danger); margin-top: 20px; font-size: 0.9rem; display: none;"></p>
                </form>
            </div>
        </div>
    `;

    setTimeout(() => {
        const form = document.getElementById('login-form');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                const btn = document.getElementById('login-btn');
                const errorMsg = document.getElementById('error-msg');

                btn.disabled = true;
                btn.textContent = 'Verificando...';
                errorMsg.style.display = 'none';

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                try {
                    // CONEXIÓN REAL A LA BD
                    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;

                    window.location.reload(); // El main.js detectará el rol y dará acceso
                } catch (err) {
                    console.error(err);
                    errorMsg.textContent = "Error: " + (err.message || "Credenciales inválidas");
                    errorMsg.style.display = 'block';
                    btn.disabled = false;
                    btn.textContent = 'Ingresar';
                }
            };
        }
    }, 0);

    return render();
}