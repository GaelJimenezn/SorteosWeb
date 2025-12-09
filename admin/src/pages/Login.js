import { supabase } from '../../../backend/services/supabase.js';

export default function Login() {
    // Retornamos una promesa que se resuelve con el HTML, aunque en este caso es estático
    // pero mantenemos la consistencia con otros componentes async si fuera necesario
    const render = () => `
        <div style="
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            padding: 20px;
        ">
            <div style="
                background: rgba(30, 41, 59, 0.7);
                backdrop-filter: blur(10px);
                padding: 40px;
                border-radius: 16px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                width: 100%;
                max-width: 400px;
                text-align: center;
            ">
                <div style="margin-bottom: 30px;">
                    <h1 style="font-size: 2rem; margin-bottom: 10px; background: linear-gradient(to right, #fbbf24, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Admin Panel</h1>
                    <p style="color: #94a3b8;">Ingresa tus credenciales</p>
                </div>

                <form id="login-form">
                    <div style="margin-bottom: 20px; text-align: left;">
                        <label style="display: block; margin-bottom: 8px; color: #e2e8f0; font-size: 0.9rem;">Email</label>
                        <input type="email" id="email" required style="
                            width: 100%;
                            padding: 12px;
                            background: rgba(15, 23, 42, 0.6);
                            border: 1px solid #334155;
                            border-radius: 8px;
                            color: white;
                            outline: none;
                            transition: border-color 0.3s;
                        " onfocus="this.style.borderColor='#fbbf24'" onblur="this.style.borderColor='#334155'">
                    </div>

                    <div style="margin-bottom: 30px; text-align: left;">
                        <label style="display: block; margin-bottom: 8px; color: #e2e8f0; font-size: 0.9rem;">Contraseña</label>
                        <input type="password" id="password" required style="
                            width: 100%;
                            padding: 12px;
                            background: rgba(15, 23, 42, 0.6);
                            border: 1px solid #334155;
                            border-radius: 8px;
                            color: white;
                            outline: none;
                            transition: border-color 0.3s;
                        " onfocus="this.style.borderColor='#fbbf24'" onblur="this.style.borderColor='#334155'">
                    </div>

                    <button type="submit" id="login-btn" style="
                        width: 100%;
                        padding: 14px;
                        background: linear-gradient(to right, #fbbf24, #d97706);
                        border: none;
                        border-radius: 8px;
                        color: #0f172a;
                        font-weight: bold;
                        cursor: pointer;
                        transition: transform 0.2s, opacity 0.2s;
                        font-size: 1rem;
                    " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                        Ingresar
                    </button>

                    <p id="error-msg" style="
                        color: #ef4444;
                        margin-top: 20px;
                        font-size: 0.9rem;
                        display: none;
                    "></p>
                </form>
            </div>
        </div>
    `;

    // Lógica del componente
    setTimeout(() => {
        const form = document.getElementById('login-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorMsg = document.getElementById('error-msg');
        const btn = document.getElementById('login-btn');

        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                btn.disabled = true;
                btn.textContent = 'Verificando...';
                errorMsg.style.display = 'none';

                const email = emailInput.value;
                const password = passwordInput.value;

                try {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });

                    if (error) throw error;

                    // Si pasa el login, verificamos rol (aunque main.js lo hará de nuevo,
                    // aquí es solo para dar feedback inmediato si no es admin)
                    // ...pero dejaremos que main.js maneje la recarga/redirección por estado.
                    // Solo recargamos la página para que initAdmin se ejecute de nuevo.
                    window.location.reload();

                } catch (err) {
                    console.error("Login error:", err);
                    errorMsg.textContent = err.message === "Invalid login credentials"
                        ? "Credenciales incorrectas"
                        : "Error al iniciar sesión: " + err.message;
                    errorMsg.style.display = 'block';
                    btn.disabled = false;
                    btn.textContent = 'Ingresar';
                }
            };
        }
    }, 0);

    return render();
}
