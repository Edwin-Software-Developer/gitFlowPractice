// Obtener elementos
const form = document.getElementById('loginForm');
const usuarioInput = document.getElementById('usuario');
const contrasenaInput = document.getElementById('contrasena');
const mensaje = document.getElementById('mensaje');

// Usuarios de prueba
const usuarios = {
    'admin': 'admin123',
    'usuario': 'usuario123',
    'test': 'test123'
};

// Manejar envío del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = usuarioInput.value;
    const contrasena = contrasenaInput.value;

    // Validar credenciales
    if (usuarios[usuario] && usuarios[usuario] === contrasena) {
        mensaje.textContent = '✓ ¡Login exitoso!';
        mensaje.className = 'success';
        
        // Limpiar formulario
        setTimeout(() => {
            form.reset();
            mensaje.textContent = '';
        }, 2000);
    } else {
        mensaje.textContent = '✗ Usuario o contraseña incorrectos';
        mensaje.className = 'error';
    }
});
