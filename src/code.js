/**
 * code.js
 * Lógica del login integrada con CRUD y validaciones
 */

// Obtener elementos
const form = document.getElementById('loginForm');
const usuarioInput = document.getElementById('usuario');
const contrasenaInput = document.getElementById('contrasena');
const mensaje = document.getElementById('mensaje');

/**
 * Inicializar
 */
function inicializar() {
    // Inicializar usuarios por defecto en localStorage
    inicializarUsuarios();
    
    // Agregar evento al formulario
    form.addEventListener('submit', manejarLogin);
}

/**
 * Manejar login
 */
function manejarLogin(e) {
    e.preventDefault();

    const usuario = usuarioInput.value.trim();
    const contrasena = contrasenaInput.value.trim();

    // Validar que los campos no estén vacíos
    if (!usuario || !contrasena) {
        mostrarMensajeLogin('Por favor complete todos los campos', 'error');
        return;
    }

    // Validar credenciales usando CRUD
    const resultado = validarCredenciales(usuario, contrasena);

    if (resultado.valido) {
        mostrarMensajeLogin('✓ ¡Login exitoso! Redirigiendo...', 'success');
        
        // Guardar usuario en sesión
        sessionStorage.setItem('usuarioLogueado', JSON.stringify(resultado.usuario));
        
        // Redirigir al dashboard después de 1.5 segundos
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        mostrarMensajeLogin('✗ ' + resultado.mensaje, 'error');
        contrasenaInput.value = ''; // Limpiar contraseña
    }
}

/**
 * Mostrar mensaje de login
 */
function mostrarMensajeLogin(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
    
    if (tipo === 'success') {
        mensaje.style.color = '#388e3c';
        mensaje.style.backgroundColor = '#d4edda';
        mensaje.style.border = '1px solid #c3e6cb';
    } else {
        mensaje.style.color = '#d32f2f';
        mensaje.style.backgroundColor = '#ffebee';
        mensaje.style.border = '1px solid #ffcdd2';
    }
    
    mensaje.style.padding = '10px';
    mensaje.style.borderRadius = '4px';
    mensaje.style.marginTop = '15px';
}

// Inicializar cuando carga la página
window.addEventListener('load', inicializar);
