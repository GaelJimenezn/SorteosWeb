import { login, register } from '../../../backend/services/auth.js';

export function openAuthModal(tipo = 'login') {
    const root = document.getElementById('modal-root');
    let mode = (tipo === 'register') ? 'register' : 'login';
    const esAdmin = (tipo === 'admin');

    const render = () => {
        const isRegister = (mode === 'register');

        root.innerHTML = `
            <div class="modal-backdrop">
                <div class="modal-box">
                    <button id="close-modal-btn" class="close-btn">&times;</button>
                    <h2 class="modal-title text-center text-primary mb-10">
                        ${esAdmin ? 'Panel Admin' : (isRegister ? 'Crear Cuenta' : 'Iniciar Sesión')}
                    </h2>
                    
                    <form id="auth-form">
                        ${isRegister ? `
                        <div class="form-group mb-10">
                            <label class="form-label">Nombre Completo <span style="color:red">*</span></label>
                            <input type="text" id="reg-name" class="form-input" required placeholder="Nombre y Apellido">
                        </div>

                        <div class="form-group mb-10">
                            <label class="form-label">Teléfono (10 dígitos) <span style="color:red">*</span></label>
                            <input type="tel" id="reg-phone" class="form-input" 
                                maxlength="10" 
                                placeholder="Ej. 4421234567"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                        </div>
                        ` : ''}

                        <div class="form-group mb-10">
                            <label class="form-label">Correo Electrónico <span style="color:red">*</span></label>
                            <input type="email" id="user-email" class="form-input" required>
                        </div>
                        
                        <div class="form-group mb-20">
                            <label class="form-label">Contraseña <span style="color:red">*</span></label>
                            <input type="password" id="user-pass" class="form-input" required>
                            
                            ${isRegister ? `
                                <div style="margin-top: 5px;">
                                    <div id="pass-strength-bar" style="height: 4px; width: 0%; background: #ddd; transition: 0.3s; border-radius: 2px;"></div>
                                    <small id="pass-strength-text" style="font-size: 0.75rem; color: #666;">Mínimo 6 carácteres + 1 símbolo especial</small>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div id="auth-error" style="color:e74c3c; text-align:center; margin-bottom:10px; font-weight:bold; font-size:0.9rem; display:none;"></div>

                        <button type="submit" id="btn-submit" class="btn-primary w-100 mt-20">
                            ${isRegister ? 'Registrarse' : 'Entrar'}
                        </button>
                    </form>

                    ${!esAdmin ? `
                    <div class="text-center mt-20">
                        <p class="text-small text-muted">
                            ${isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                            <a href="#" id="toggle-auth" class="text-primary" style="font-weight:bold;">
                                ${isRegister ? 'Inicia Sesión' : 'Regístrate aquí'}
                            </a>
                        </p>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;

        // 1. Lógica UI (Cerrar y Switch)
        document.getElementById('close-modal-btn').onclick = () => root.innerHTML = '';
        const toggleBtn = document.getElementById('toggle-auth');
        if (toggleBtn) {
            toggleBtn.onclick = (e) => {
                e.preventDefault();
                mode = (mode === 'login' ? 'register' : 'login');
                render();
            };
        }

        // 2. Lógica de Fuerza de Contraseña (Solo Registro)
        if (isRegister) {
            const passInput = document.getElementById('user-pass');
            const bar = document.getElementById('pass-strength-bar');
            const text = document.getElementById('pass-strength-text');

            passInput.oninput = () => {
                const val = passInput.value;
                let strength = 0;
                let msg = "Muy débil";
                let color = "#e74c3c"; // Rojo

                if (val.length >= 6) strength += 1;
                if (val.match(/[0-9]/)) strength += 1;
                if (val.match(/[^a-zA-Z0-9]/)) strength += 1; // Carácter especial

                if (strength === 1) { width = "33%"; }
                else if (strength === 2) { width = "66%"; color = "#f1c40f"; msg = "Media"; } // Amarillo
                else if (strength === 3) { width = "100%"; color = "#2ecc71"; msg = "Fuerte"; } // Verde
                else { var width = "5%"; }

                bar.style.width = width;
                bar.style.backgroundColor = color;

                if (val.length > 0) text.innerText = msg;
            };
        }

        // 3. LOGICA DE ENVÍO
        document.getElementById('auth-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit');
            const errorDiv = document.getElementById('auth-error');
            const email = document.getElementById('user-email').value;
            const password = document.getElementById('user-pass').value;

            errorDiv.style.display = 'none';

            // --- VALIDACIONES PREVIAS (Solo Registro) ---
            if (isRegister) {
                const nombre = document.getElementById('reg-name').value;
                const telefono = document.getElementById('reg-phone').value;

                // Validar Teléfono (10 dígitos exactos)
                if (telefono.length !== 10) {
                    errorDiv.innerText = "⚠️ El teléfono debe tener 10 dígitos exactos.";
                    errorDiv.style.display = 'block';
                    return;
                }

                // Validar Contraseña (Fuerte)
                if (password.length < 6 || !password.match(/[^a-zA-Z0-9]/)) {
                    errorDiv.innerText = "⚠️ La contraseña debe tener mínimo 6 carácteres y un símbolo especial (@, #, $, etc).";
                    errorDiv.style.display = 'block';
                    return;
                }

                btn.disabled = true;
                btn.innerText = 'Creando Cuenta...';

                try {
                    // Llamada a Supabase
                    const result = await register(email, password, nombre, telefono);

                    alert('¡Cuenta creada con éxito!');
                    localStorage.setItem('currentUser', JSON.stringify({
                        email: result.user.email,
                        nombre: nombre,
                        role: 'user'
                    }));
                    location.reload();

                } catch (error) {
                    console.error(error);
                    errorDiv.innerText = error.message;
                    errorDiv.style.display = 'block';
                    btn.disabled = false;
                    btn.innerText = 'Registrarse';
                }

            } else {
                // --- LOGIN ---
                btn.disabled = true;
                btn.innerText = 'Entrando...';
                try {
                    const user = await login(email, password);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    if (user.role === 'admin') window.location.href = '/admin/index.html';
                    else location.reload();
                } catch (error) {
                    errorDiv.innerText = "Credenciales incorrectas.";
                    errorDiv.style.display = 'block';
                    btn.disabled = false;
                    btn.innerText = 'Entrar';
                }
            }
        };
    };

    render();
}