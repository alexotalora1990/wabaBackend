import EtiquetaSistema from "../models/etiquetaSistema.js";

const helpersEtiquetaSistema = {
  // Validar si existe una etiqueta por ID
  validarExistaIdEtiqueta: async (id) => {
    const existe = await EtiquetaSistema.findById(id);
    if (!existe) {
      throw new Error(`No existe una etiqueta con el ID ${id}`);
    }
  },

  // Validar si el nombre de la etiqueta ya está registrado
  validarNombreUnico: async (nombre) => {
    const existe = await EtiquetaSistema.findOne({ nombre });
    if (existe) {
      throw new Error(`El nombre '${nombre}' ya está registrado`);
    }
  },
};

export default helpersEtiquetaSistema;
