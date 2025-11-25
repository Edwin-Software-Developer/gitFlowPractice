/**
 * dashboard.js
 * Lógica del dashboard de gestión de usuarios
 */

// Elementos del DOM
const formUsuario = document.getElementById('formUsuario');
const nombreInput = document.getElementById('nombre');
const usuarioInput = document.getElementById('usuario');
const emailInput = document.getElementById('email');
const contrasenaInput = document.getElementById('contrasena');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const mensaje = document.getElementById('mensaje');
const usuarioActual = document.getElementById('usuarioActual');
const totalUsuariosCard = document.getElementById('totalUsuarios');

// Datos de sesión
let usuarioLogueado = null;
let editandoId = null;

/**
 * Inicializar dashboard
 */
function inicializarDashboard() {
    const usuarioJSON = sessionStorage.getItem('usuarioLogueado');
    
    if (!usuarioJSON) {
        window.location.href = 'index.html';
        return;
    }
    
    usuarioLogueado = JSON.parse(usuarioJSON);
    usuarioActual.textContent = `Bienvenido, ${usuarioLogueado.nombre}`;
    
    cargarUsuarios();
    actualizarEstadisticas();
    
    formUsuario.addEventListener('submit', manejarSubmit);
}

/**
 * Cargar y mostrar todos los usuarios en la tabla
 */
function cargarUsuarios() {
    const usuarios = obtenerUsuarios();
    
    if (usuarios.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="6" style="text-align: center;">No hay usuarios registrados</td></tr>';
        return;
    }
    
    cuerpoTabla.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.fechaCreacion}</td>
            <td>
                <button class="btn btn-secondary" onclick="editarUsuario(${usuario.id})" style="padding: 5px 10px; margin-right: 5px;">Editar</button>
                <button class="btn btn-danger" onclick="eliminarUsuarioDashboard(${usuario.id})" style="padding: 5px 10px;">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

/**
 * Actualizar estadísticas
 */
function actualizarEstadisticas() {
    const totalUsuarios = contarUsuarios();
    totalUsuariosCard.textContent = totalUsuarios;
}

/**
 * Mostrar mensaje en pantalla
 */
function mostrarMensaje(texto, tipo = 'success') {
    mensaje.textContent = texto;
    mensaje.className = tipo;
    mensaje.style.display = 'block';
    
    if (tipo === 'success') {
        mensaje.style.backgroundColor = '#d4edda';
        mensaje.style.color = '#155724';
        mensaje.style.border = '1px solid #c3e6cb';
    } else {
        mensaje.style.backgroundColor = '#f8d7da';
        mensaje.style.color = '#721c24';
        mensaje.style.border = '1px solid #f5c6cb';
    }
    
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}

/**
 * Manejar envío del formulario
 */
function manejarSubmit(e) {
    e.preventDefault();
    
    const nombre = nombreInput.value.trim();
    const usuario = usuarioInput.value.trim();
    const email = emailInput.value.trim();
    const contrasena = contrasenaInput.value.trim();
    
    // Validar datos
    let validacion = validarNombre(nombre);
    if (!validacion.valido) {
        mostrarMensaje(validacion.mensaje, 'error');
        return;
    }
    
    validacion = validarUsuario(usuario);
    if (!validacion.valido) {
        mostrarMensaje(validacion.mensaje, 'error');
        return;
    }
    
    validacion = validarEmail(email);
    if (!validacion.valido) {
        mostrarMensaje(validacion.mensaje, 'error');
        return;
    }
    
    validacion = validarContrasena(contrasena);
    if (!validacion.valido) {
        mostrarMensaje(validacion.mensaje, 'error');
        return;
    }
    
    // Si está editando
    if (editandoId !== null) {
        const resultado = actualizarUsuario(editandoId, { nombre, usuario, email, contrasena });
        if (resultado.exito) {
            mostrarMensaje('Usuario actualizado correctamente', 'success');
            limpiarFormulario();
        } else {
            mostrarMensaje(resultado.mensaje, 'error');
        }
    } else {
        // Si está creando
        const resultado = crearUsuario(usuario, contrasena, email, nombre);
        if (resultado.exito) {
            mostrarMensaje('Usuario creado correctamente', 'success');
            limpiarFormulario();
        } else {
            mostrarMensaje(resultado.mensaje, 'error');
        }
    }
    
    cargarUsuarios();
    actualizarEstadisticas();
}

/**
 * Editar usuario
 */
function editarUsuario(id) {
    const usuario = obtenerUsuarioPorId(id);
    
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    
    nombreInput.value = usuario.nombre;
    usuarioInput.value = usuario.usuario;
    emailInput.value = usuario.email;
    contrasenaInput.value = usuario.contrasena;
    
    editandoId = id;
    
    // Cambiar texto del botón
    const btnSubmit = formUsuario.querySelector('button[type="submit"]');
    btnSubmit.textContent = 'Actualizar Usuario';
    
    nombreInput.focus();
}

/**
 * Limpiar formulario
 */
function limpiarFormulario() {
    formUsuario.reset();
    editandoId = null;
    
    const btnSubmit = formUsuario.querySelector('button[type="submit"]');
    btnSubmit.textContent = 'Crear Usuario';
}

/**
 * Eliminar usuario desde dashboard
 */
function eliminarUsuarioDashboard(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        const resultado = eliminarUsuario(id);
        
        if (resultado.exito) {
            mostrarMensaje('Usuario eliminado correctamente', 'success');
            cargarUsuarios();
            actualizarEstadisticas();
        } else {
            mostrarMensaje(resultado.mensaje, 'error');
        }
    }
}

/**
 * Cerrar sesión
 */
function cerrarSesion() {
    sessionStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
}

// Inicializar cuando carga la página
window.addEventListener('load', inicializarDashboard);
