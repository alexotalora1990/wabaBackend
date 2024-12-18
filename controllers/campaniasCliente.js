import CampaniasCliente from "../models/campaniasCliente.js";

const httpCampaniasCliente = {
  // Obtener todas las campañas
  getCampanias: async (req, res) => {
    try {
      const campanias = await CampaniasCliente.find();
      res.json(campanias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener campañas" });
    }
  },

  // Obtener una campaña por ID
  getCampaniaById: async (req, res) => {
    try {
      const { id } = req.params;
      const campania = await CampaniasCliente.findById(id);
      if (!campania) return res.status(404).json({ error: "Campaña no encontrada" });
      res.json(campania);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la campaña" });
    }
  },

  // Crear una campaña
  postCampania: async (req, res) => {
    try {
      const nuevaCampania = new CampaniasCliente(req.body);
      await nuevaCampania.save();
      res.status(201).json({ mensaje: "Campaña creada", campania: nuevaCampania });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear campaña" });
    }
  },

  // Actualizar una campaña
  putCampania: async (req, res) => {
    try {
      const { id } = req.params;
      const campaniaActualizada = await CampaniasCliente.findByIdAndUpdate(id, req.body, { new: true });
      if (!campaniaActualizada) return res.status(404).json({ error: "Campaña no encontrada" });
      res.json({ mensaje: "Campaña actualizada", campania: campaniaActualizada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar campaña" });
    }
  },

  // Activar una campaña
  activarCampania: async (req, res) => {
    try {
      const { id } = req.params;
      const campaniaActivada = await CampaniasCliente.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      res.json({ mensaje: "Campaña activada", campania: campaniaActivada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar la campaña" });
    }
  },

  // Desactivar una campaña
  desactivarCampania: async (req, res) => {
    try {
      const { id } = req.params;
      const campaniaDesactivada = await CampaniasCliente.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      res.json({ mensaje: "Campaña desactivada", campania: campaniaDesactivada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al desactivar la campaña" });
    }
  },

  // Eliminar una campaña
  deleteCampania: async (req, res) => {
    try {
      const { id } = req.params;
      await CampaniasCliente.findByIdAndDelete(id);
      res.json({ mensaje: "Campaña eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar la campaña" });
    }
  },
};

export default httpCampaniasCliente;
