import Producto from "../models/productos.js";

const helpersProducto = {
  // Validar si existe un producto por ID
  validarExistaIdProducto: async (id) => {
    const existe = await Producto.findById(id);
    if (!existe) {
      throw new Error(`No existe un producto con el ID ${id}`);
    }
  },

  // Validar si el código del producto ya existe
  validarCodigoUnico: async (codigo) => {
    const existe = await Producto.findOne({ codigo });
    if (existe) {
      throw new Error(`El código '${codigo}' ya está registrado`);
    }
  },
};

export default helpersProducto;
