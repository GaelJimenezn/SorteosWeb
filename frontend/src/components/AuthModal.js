export function openAuthModal(tipo) {
    const root = document.getElementById('modal-root');
    const esAdmin = tipo === 'admin';

    root.innerHTML = `
        <div class="overlay-backdrop">
            <div class="modal-card">
                <button onclick="document.getElementById('modal-root').innerHTML=''" class="btn-icon-close">&times;</button>
                <h2 class="modal-title text-center text-primary mb-10">${esAdmin ? 'Panel Admin' : 'Acceso'}</h2>
                <form id="auth-form">
                    <div class="form-group mb-10">
                        <label class="form-label">Usuario / Correo</label>
                        <input type="text" id="user" class="form-input" required>
                    </div>
                    ${esAdmin ? `
                    <div class="form-group mb-20">
                        <label class="form-label">Contraseña</label>
                        <input type="password" id="pass" class="form-input" required>
                    </div>` : ''}
                    <button type="submit" class="btn-primary w-100 mt-20">Entrar</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('auth-form').onsubmit = (e) => {
        e.preventDefault();
        const u = document.getElementById('user').value;
        if (esAdmin) {
            const p = document.getElementById('pass').value;
            // Ajusta la ruta de redirección según tu estructura de carpetas real
            if (u === 'admin' && p === 'admin123') window.location.href = '../../admin/index.html';
            else alert('Credenciales incorrectas');
        } else {
            localStorage.setItem('currentUser', JSON.stringify({ nombre: u.split('@')[0], email: u }));
            location.reload();
        }
    };
}