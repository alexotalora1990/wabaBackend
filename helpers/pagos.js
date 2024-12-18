import Pago from "../models/pagos.js";

const helpersPago = {
  // Validar si existe un pago por ID
  validarExistaIdPago: async (id) => {
    const existe = await Pago.findById(id);
    if (!existe) {
      throw new Error(`No existe un pago con el ID ${id}`);
    }
  },

  // Validar si el ID del cliente existe
  validarIdCliente: async (idCliente) => {
    if (!idCliente) {
      throw new Error("El ID del cliente es requerido");
    }
  },
};

export default helpersPago;
