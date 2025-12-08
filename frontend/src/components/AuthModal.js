export function openAuthModal(tipo = 'login') {
    const root = document.getElementById('modal-root');
    const esAdmin = tipo === 'admin';
    let mode = tipo === 'register' ? 'register' : 'login';

    const render = () => {
        const isRegister = mode === 'register';

        root.innerHTML = `
            <div class="modal-backdrop">
                <div class="modal-box">
                    <button onclick="document.getElementById('modal-root').innerHTML=''" class="close-btn">&times;</button>
                    <h2 class="modal-title text-center text-primary mb-10">${esAdmin ? 'Panel Admin' : (isRegister ? 'Crear Cuenta' : 'Iniciar Sesión')}</h2>
                    <form id="auth-form">
                        
                        ${isRegister ? `
                        <div class="form-group mb-10">
                            <label class="form-label">Nombre Completo</label>
                            <input type="text" id="reg-name" class="form-input" required>
                        </div>
                        <div class="form-group mb-10">
                            <label class="form-label">Teléfono</label>
                            <input type="tel" id="reg-phone" class="form-input" required>
                        </div>
                        ` : ''}

                        <div class="form-group mb-10">
                            <label class="form-label">Correo Electrónico</label>
                            <input type="email" id="user" class="form-input" required>
                        </div>
                        
                        <div class="form-group mb-20">
                            <label class="form-label">Contraseña</label>
                            <input type="password" id="pass" class="form-input" required>
                        </div>
                        
                        <button type="submit" class="btn-primary w-100 mt-20">${isRegister ? 'Registrarse' : 'Entrar'}</button>
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

        // Logic for Toggle
        const toggleBtn = document.getElementById('toggle-auth');
        if (toggleBtn) {
            toggleBtn.onclick = (e) => {
                e.preventDefault();
                mode = mode === 'login' ? 'register' : 'login';
                render(); // Re-render with new mode
            };
        }

        // Logic for Submit
        document.getElementById('auth-form').onsubmit = (e) => {
            e.preventDefault();

            if (esAdmin) {
                const u = document.getElementById('user').value;
                const p = document.getElementById('pass').value;
                if (u === 'admin' && p === 'admin123') window.location.href = '../../admin/index.html';
                else alert('Credenciales incorrectas');
                return;
            }

            // Normal User Logic
            const email = document.getElementById('user').value;
            let userData = { email, nombre: email.split('@')[0] }; // Default for login

            if (mode === 'register') {
                const name = document.getElementById('reg-name').value;
                userData.nombre = name;
                alert('¡Registro exitoso! Ahora estás logueado.');
            } else {
                // Simulate login check (allow any for now but could check DB in future)
                // alert('Bienvenido de nuevo');
            }

            localStorage.setItem('currentUser', JSON.stringify(userData));
            location.reload();
        };
    };

    render();
}