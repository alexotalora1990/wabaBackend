import Usuario from "../models/usuarios.js";

// Obtener todos los usuarios
const httpsUsuario = {
getUsuarios: async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
},

// Obtener usuario por ID
getUsuarioById: async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
},

// Crear un usuario
postUsuario: async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario creado", usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
},

// Activar usuario
activarUsuario: async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 }, { new: true });
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json({ mensaje: "Usuario activado", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al activar usuario" });
    }
},

// Desactivar usuario
desactivarUsuario: async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 }, { new: true });
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json({ mensaje: "Usuario desactivado", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al desactivar usuario" });
    }
},

// Actualizar usuario
putUsuario: async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json({ mensaje: "Usuario actualizado", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
}
}
export default httpsUsuario
