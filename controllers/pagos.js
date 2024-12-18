import Pago from "../models/pagos.js";

const httpPago = {
  // Obtener todos los pagos
  getPagos: async (req, res) => {
    try {
      const pagos = await Pago.find().populate("idCliente", "nombre"); // Mostrar el nombre del cliente si existe
      res.json(pagos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los pagos" });
    }
  },

  // Obtener un pago por ID
  getPagoById: async (req, res) => {
    try {
      const { id } = req.params;
      const pago = await Pago.findById(id).populate("idCliente", "nombre");
      if (!pago) return res.status(404).json({ error: "Pago no encontrado" });
      res.json(pago);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el pago" });
    }
  },

  // Crear un pago
  postPago: async (req, res) => {
    try {
      const nuevoPago = new Pago(req.body);
      await nuevoPago.save();
      res.status(201).json({ mensaje: "Pago registrado exitosamente", pago: nuevoPago });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al registrar el pago" });
    }
  },

  // Actualizar un pago
  putPago: async (req, res) => {
    try {
      const { id } = req.params;
      const pagoActualizado = await Pago.findByIdAndUpdate(id, req.body, { new: true });
      if (!pagoActualizado) return res.status(404).json({ error: "Pago no encontrado" });
      res.json({ mensaje: "Pago actualizado", pago: pagoActualizado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el pago" });
    }
  },

  // Activar un pago
  activarPago: async (req, res) => {
    try {
      const { id } = req.params;
      const pagoActivado = await Pago.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      res.json({ mensaje: "Pago activado", pago: pagoActivado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar el pago" });
    }
  },

  // Desactivar un pago
  desactivarPago: async (req, res) => {
    try {
      const { id } = req.params;
      const pagoDesactivado = await Pago.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      res.json({ mensaje: "Pago desactivado", pago: pagoDesactivado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al desactivar el pago" });
    }
  },
};

export default httpPago;
