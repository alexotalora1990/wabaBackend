import CampaniasCliente from "../models/campaniasCliente.js";

const helpersCampaniasCliente = {
  // Validar si existe una campaña por ID
  validarExistaIdCampaniaCliente: async (id) => {
    const existe = await CampaniasCliente.findById(id);
    if (!existe) {
      throw new Error(`No existe una campaña con el ID ${id}`);
    }
  },

  // Validar si el nombre de la campaña ya existe
  validarNombreUnico: async (nombre) => {
    const existe = await CampaniasCliente.findOne({ nombre });
    if (existe) {
      throw new Error(`El nombre '${nombre}' ya está registrado`);
    }
  },
};

export default helpersCampaniasCliente;
