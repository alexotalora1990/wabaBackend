import Cliente from "../models/clientes.js";

const httpCliente = {
  // Obtener todos los clientes
  getClientes: async (req, res) => {
    try {
      const clientes = await Cliente.find();
      res.json(clientes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener clientes" });
    }
  },

  // Obtener cliente por ID
  getClienteById: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findById(id);
      if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
      res.json(cliente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el cliente" });
    }
  },
  // Obtener clientes activos
getClientesActivos: async (req, res) => {
  try {
    const clientes = await Cliente.find({ estado: 1 });
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener clientes activos" });
  }
},

// Obtener clientes inactivos
getClientesInactivos: async (req, res) => {
  try {
    const clientes = await Cliente.find({ estado: 0 });
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener clientes inactivos" });
  }
},
  // Crear un cliente
  postCliente: async (req, res) => {
    try {
      const nuevoCliente = new Cliente(req.body);
      await nuevoCliente.save();
      res.status(201).json({ mensaje: "Cliente creado", cliente: nuevoCliente });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear cliente" });
    }
  },

  // Activar cliente
  activarCliente: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
      res.json({ mensaje: "Cliente activado", cliente });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar cliente" });
    }
  },

  // Desactivar cliente
  desactivarCliente: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
      res.json({ mensaje: "Cliente desactivado", cliente });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al desactivar cliente" });
    }
  },

  // Actualizar cliente
  putCliente: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
      if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
      res.json({ mensaje: "Cliente actualizado", cliente });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar cliente" });
    }
  },
};

export default httpCliente;
