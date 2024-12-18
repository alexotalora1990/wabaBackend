import Usuario from "../models/usuarios.js";

const helpersUsuario = {
  // Validar si el usuario existe por ID
  validarExistaIdUsuario: async (id) => {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      throw new Error(`No existe un usuario con el ID ${id}`);
    }
  },

  // Validar si el correo ya está registrado
  validarCorreoUnico: async (correo) => {
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      throw new Error(`El correo ${correo} ya está registrado`);
    }
  },

  // Validar si el teléfono ya está registrado
  validarTelefonoUnico: async (telefono) => {
    const existe = await Usuario.findOne({ telefono });
    if (existe) {
      throw new Error(`El teléfono ${telefono} ya está registrado`);
    }
  },
};

export default helpersUsuario;
