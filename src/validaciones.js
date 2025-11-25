/**
 * validaciones.js
 * Archivo con funciones para validar datos de usuario
 */

// Validar que el usuario no esté vacío y tenga longitud mínima
function validarUsuario(usuario) {
    if (!usuario || usuario.trim() === '') {
        return { valido: false, mensaje: 'El usuario no puede estar vacío' };
    }
    if (usuario.length < 3) {
        return { valido: false, mensaje: 'El usuario debe tener al menos 3 caracteres' };
    }
    if (usuario.length > 20) {
        return { valido: false, mensaje: 'El usuario no puede exceder 20 caracteres' };
    }
    return { valido: true, mensaje: 'Usuario válido' };
}

// Validar que la contraseña tenga longitud mínima
function validarContrasena(contrasena) {
    if (!contrasena || contrasena === '') {
        return { valido: false, mensaje: 'La contraseña no puede estar vacía' };
    }
    if (contrasena.length < 6) {
        return { valido: false, mensaje: 'La contraseña debe tener al menos 6 caracteres' };
    }
    if (contrasena.length > 30) {
        return { valido: false, mensaje: 'La contraseña no puede exceder 30 caracteres' };
    }
    return { valido: true, mensaje: 'Contraseña válida' };
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === '') {
        return { valido: false, mensaje: 'El email no puede estar vacío' };
    }
    if (!regex.test(email)) {
        return { valido: false, mensaje: 'Email inválido' };
    }
    return { valido: true, mensaje: 'Email válido' };
}

// Validar nombre
function validarNombre(nombre) {
    if (!nombre || nombre.trim() === '') {
        return { valido: false, mensaje: 'El nombre no puede estar vacío' };
    }
    if (nombre.length < 2) {
        return { valido: false, mensaje: 'El nombre debe tener al menos 2 caracteres' };
    }
    if (nombre.length > 50) {
        return { valido: false, mensaje: 'El nombre no puede exceder 50 caracteres' };
    }
    return { valido: true, mensaje: 'Nombre válido' };
}

// Validar usuario completo (para registro)
function validarUsuarioCompleto(usuario, contrasena, email, nombre) {
    const validaciones = [
        validarUsuario(usuario),
        validarContrasena(contrasena),
        validarEmail(email),
        validarNombre(nombre)
    ];

    for (let validacion of validaciones) {
        if (!validacion.valido) {
            return validacion;
        }
    }

    return { valido: true, mensaje: 'Todos los datos son válidos' };
}
