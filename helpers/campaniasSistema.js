import CampaniasSistema from "../models/campaniasSistema.js";

const helpersCampaniasSistema = {
  // Validar si existe una campaña por ID
  validarExistaIdCampania: async (id) => {
    const existe = await CampaniasSistema.findById(id);
    if (!existe) {
      throw new Error(`No existe una campaña con el ID ${id}`);
    }
  },

  // Validar si el nombre de la campaña ya existe
  validarNombreUnico: async (nombre) => {
    const existe = await CampaniasSistema.findOne({ nombre });
    if (existe) {
      throw new Error(`El nombre '${nombre}' ya está registrado`);
    }
  },
};

export default helpersCampaniasSistema;
