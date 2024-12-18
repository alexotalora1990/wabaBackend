import CampaniasSistema from "../models/campaniasSistema.js";

const httpCampaniasSistema = {
  // Obtener todas las campañas
  getCampañas: async (req, res) => {
    try {
      const campanias = await CampaniasSistema.find();
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
      const campania = await CampaniasSistema.findById(id);
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
      const nuevaCampania = new CampaniasSistema(req.body);
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
      const campaniaActualizada = await CampaniasSistema.findByIdAndUpdate(id, req.body, { new: true });
      if (!campaniaActualizada) return res.status(404).json({ error: "Campaña no encontrada" });
      res.json({ mensaje: "Campaña actualizada", campaña: campaniaActualizada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar campaña" });
    }
  },

  // Activar una campaña
  activarCampania: async (req, res) => {
    try {
      const { id } = req.params;
      const campaniaActivada = await CampaniasSistema.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      res.json({ mensaje: "Campaña activada", campaña: campaniaActivada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar la campaña" });
    }
  },

  // Desactivar una campaña
  desactivarCampania: async (req, res) => {
    try {
      const { id } = req.params;
      const campaniaDesactivada = await CampaniasSistema.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      res.json({ mensaje: "Campaña desactivada", campaña: campaniaDesactivada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al desactivar la campaña" });
    }
  },
};

export default httpCampaniasSistema;
