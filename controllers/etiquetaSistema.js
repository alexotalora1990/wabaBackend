import EtiquetaSistema from "../models/etiquetaSistema.js";

const httpEtiquetaSistema = {
  // Obtener todas las etiquetas
  getEtiquetas: async (req, res) => {
    try {
      const etiquetas = await EtiquetaSistema.find();
      res.json(etiquetas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener etiquetas" });
    }
  },

  // Obtener etiqueta por ID
  getEtiquetaById: async (req, res) => {
    try {
      const { id } = req.params;
      const etiqueta = await EtiquetaSistema.findById(id);
      if (!etiqueta) return res.status(404).json({ error: "Etiqueta no encontrada" });
      res.json(etiqueta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la etiqueta" });
    }
  },

  // Crear una nueva etiqueta
  postEtiqueta: async (req, res) => {
    try {
      const nuevaEtiqueta = new EtiquetaSistema(req.body);
      await nuevaEtiqueta.save();
      res.status(201).json({ mensaje: "Etiqueta creada", etiqueta: nuevaEtiqueta });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear etiqueta" });
    }
  },

  // Actualizar etiqueta
  putEtiqueta: async (req, res) => {
    try {
      const { id } = req.params;
      const etiquetaActualizada = await EtiquetaSistema.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!etiquetaActualizada) return res.status(404).json({ error: "Etiqueta no encontrada" });
      res.json({ mensaje: "Etiqueta actualizada", etiqueta: etiquetaActualizada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar etiqueta" });
    }
  },

  // Activar etiqueta
  activarEtiqueta: async (req, res) => {
    try {
      const { id } = req.params;
      const etiquetaActivada = await EtiquetaSistema.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      if (!etiquetaActivada) return res.status(404).json({ error: "Etiqueta no encontrada" });
      res.json({ mensaje: "Etiqueta activada", etiqueta: etiquetaActivada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar etiqueta" });
    }
  },

  // Desactivar etiqueta
  desactivarEtiqueta: async (req, res) => {
    try {
      const { id } = req.params;
      const etiquetaDesactivada = await EtiquetaSistema.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      if (!etiquetaDesactivada) return res.status(404).json({ error: "Etiqueta no encontrada" });
      res.json({ mensaje: "Etiqueta desactivada", etiqueta: etiquetaDesactivada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al desactivar etiqueta" });
    }
  },
};

export default httpEtiquetaSistema;
