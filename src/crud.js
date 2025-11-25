/**
 * crud.js
 * Archivo con operaciones CRUD para gestionar usuarios
 */

// Nombre de la clave en localStorage
const STORAGE_KEY = 'usuarios';

/**
 * Inicializar usuarios por defecto
 */
function inicializarUsuarios() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        const usuariosDefault = [
            { id: 1, usuario: 'admin', contrasena: 'admin123', email: 'admin@ejemplo.com', nombre: 'Administrador', fechaCreacion: new Date().toLocaleDateString() },
            { id: 2, usuario: 'usuario', contrasena: 'usuario123', email: 'usuario@ejemplo.com', nombre: 'Usuario Test', fechaCreacion: new Date().toLocaleDateString() },
            { id: 3, usuario: 'test', contrasena: 'test123', email: 'test@ejemplo.com', nombre: 'Test User', fechaCreacion: new Date().toLocaleDateString() }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usuariosDefault));
    }
}

/**
 * CREATE - Agregar un nuevo usuario
 */
function crearUsuario(usuario, contrasena, email, nombre) {
    const usuarios = obtenerUsuarios();
    
    // Verificar si el usuario ya existe
    if (usuarios.some(u => u.usuario === usuario)) {
        return { exito: false, mensaje: 'El usuario ya existe' };
    }
    
    const nuevoUsuario = {
        id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
        usuario,
        contrasena,
        email,
        nombre,
        fechaCreacion: new Date().toLocaleDateString()
    };
    
    usuarios.push(nuevoUsuario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    
    return { exito: true, mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario };
}

/**
 * READ - Obtener todos los usuarios
 */
function obtenerUsuarios() {
    inicializarUsuarios();
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/**
 * READ - Obtener usuario por ID
 */
function obtenerUsuarioPorId(id) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(u => u.id === id);
}

/**
 * READ - Obtener usuario por nombre de usuario
 */
function obtenerUsuarioPorNombre(usuario) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(u => u.usuario === usuario);
}

/**
 * UPDATE - Actualizar usuario
 */
function actualizarUsuario(id, datosActualizados) {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
        return { exito: false, mensaje: 'Usuario no encontrado' };
    }
    
    usuarios[index] = {
        ...usuarios[index],
        ...datosActualizados,
        id: usuarios[index].id, // Evitar que cambien el ID
        fechaCreacion: usuarios[index].fechaCreacion // Mantener fecha original
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    return { exito: true, mensaje: 'Usuario actualizado correctamente', usuario: usuarios[index] };
}

/**
 * DELETE - Eliminar usuario
 */
function eliminarUsuario(id) {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
        return { exito: false, mensaje: 'Usuario no encontrado' };
    }
    
    const usuarioEliminado = usuarios[index];
    usuarios.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    
    return { exito: true, mensaje: 'Usuario eliminado correctamente', usuario: usuarioEliminado };
}

/**
 * Validar credenciales (para login)
 */
function validarCredenciales(usuario, contrasena) {
    const usuarioEncontrado = obtenerUsuarioPorNombre(usuario);
    
    if (!usuarioEncontrado) {
        return { valido: false, mensaje: 'Usuario no encontrado' };
    }
    
    if (usuarioEncontrado.contrasena !== contrasena) {
        return { valido: false, mensaje: 'Contraseña incorrecta' };
    }
    
    return { valido: true, mensaje: 'Credenciales válidas', usuario: usuarioEncontrado };
}

/**
 * Contar total de usuarios
 */
function contarUsuarios() {
    return obtenerUsuarios().length;
}
