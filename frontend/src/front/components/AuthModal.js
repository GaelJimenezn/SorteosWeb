export function openAuthModal(tipo) {
    const root = document.getElementById('modal-root');
    const esAdmin = tipo === 'admin';

    root.innerHTML = `
        <div class="overlay-full" style="z-index: 3000;"> <div style="background: white; padding: 40px; border-radius: 8px; width: 90%; max-width: 400px; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                <button onclick="document.getElementById('modal-root').innerHTML=''" style="position: absolute; right: 15px; top: 15px; border:none; background:none; font-size: 1.5rem; cursor:pointer;">&times;</button>
                
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 10px;">
                    ${esAdmin ? 'Panel Administrativo' : 'Acceso Participantes'}
                </h2>
                <p style="text-align: center; color: #666; margin-bottom: 30px;">
                    ${esAdmin ? 'Ingresa tus credenciales de gestión.' : 'Ingresa para guardar tus boletos.'}
                </p>

                <form id="auth-form">
                    <div style="margin-bottom: 15px;">
                        <input type="text" id="user" placeholder="${esAdmin ? 'Usuario Admin' : 'Correo Electrónico'}" class="input-pro" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px;" required>
                    </div>
                    <div style="margin-bottom: 25px;">
                        <input type="password" id="pass" placeholder="Contraseña" class="input-pro" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px;" required>
                    </div>
                    
                    <button type="submit" class="btn-primary" style="width: 100%;">
                        ${esAdmin ? 'Entrar al Panel' : 'Iniciar Sesión'}
                    </button>
                </form>

                ${!esAdmin ? `
                <div style="margin-top: 20px; text-align: center; font-size: 0.9rem;">
                    ¿Nuevo aquí? <a href="#" onclick="alert('Registro rápido: Al comprar un boleto se crea tu cuenta automáticamente.')" style="color: var(--accent); font-weight: bold;">Crear cuenta</a>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    document.getElementById('auth-form').onsubmit = (e) => {
        e.preventDefault();
        const u = document.getElementById('user').value;
        const p = document.getElementById('pass').value;

        if (esAdmin) {
            // Validación simple de Admin
            if (u === 'admin' && p === 'admin123') {
                window.location.href = 'admin.html'; // Redirige al archivo Admin separado
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        } else {
            // Login de Usuario Simulado
            if (u.includes('@')) {
                const usuario = { nombre: u.split('@')[0], email: u };
                localStorage.setItem('currentUser', JSON.stringify(usuario));
                location.reload(); // Recargar para actualizar Navbar
            } else {
                alert('Por favor ingresa un correo válido.');
            }
        }
    };
}