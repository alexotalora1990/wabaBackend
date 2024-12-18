import Cliente from "../models/clientes.js";

const helpersCliente = {
  // Validar si el cliente existe por ID
  validarExistaIdCliente: async (id) => {
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      throw new Error(`No existe un cliente con el ID ${id}`);
    }
  },

  // Validar si el correo del cliente ya está registrado
  validarCorreoUnico: async (correo) => {
    const existe = await Cliente.findOne({ correo });
    if (existe) {
      throw new Error(`El correo ${correo} ya está registrado`);
    }
  },

  // Validar si el número de WhatsApp o teléfono del cliente ya está registrado
  validarWpUnico: async (wp) => {
    const existe = await Cliente.findOne({ wp });
    if (existe) {
      throw new Error(`El número de WhatsApp ${wp} ya está registrado`);
    }
  },

  // Validar si el documento del cliente ya está registrado
  validarDocumentoUnico: async (documento) => {
    const existe = await Cliente.findOne({ documento });
    if (existe) {
      throw new Error(`El documento ${documento} ya está registrado`);
    }
  },
};

export default helpersCliente;
