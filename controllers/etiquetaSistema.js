import etiquetaSistema from "../models/etiquetaSistema.js";


const httpEtiquetaSistema = {
  // Obtener todas las etiquetas
  getEtiquetas: async (req, res) => {
    try {
      const etiquetas = await etiquetaSistema.find();
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
      const etiqueta = await etiquetaSistema.findById(id);
      if (!etiqueta) return res.status(404).json({ error: "Etiqueta no encontrada" });
      res.json(etiqueta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la etiqueta" });
    }
  },
  // Obtener etiquetas activos
  getEtiquetasActivas: async (req, res) => {
    try {
      const etiquetas = await etiquetaSistema.find({ estado: 1 });
      res.json(etiquetas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener etiquetas del sistema activos" });
    }
  },
  
  // Obtener etiquetas inactivos
  getEtiquetasInactivos: async (req, res) => {
    try {
      const etiquetas= await etiquetaSistema.find({ estado: 0 });
      res.json(etiquetas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener etiquetas del sistema inactivos" });
    }
  },

  // Crear una nueva etiqueta
  postEtiqueta: async (req, res) => {
    try {
      const nuevaEtiqueta = new etiquetaSistema(req.body);
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
      const etiquetaActualizada = await etiquetaSistema.findByIdAndUpdate(id, req.body, {
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
      const etiquetaActivada = await etiquetaSistema.findByIdAndUpdate(id, { estado: 1 }, { new: true });
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
      const etiquetaDesactivada = await etiquetaSistema.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      if (!etiquetaDesactivada) return res.status(404).json({ error: "Etiqueta no encontrada" });
      res.json({ mensaje: "Etiqueta desactivada", etiqueta: etiquetaDesactivada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al desactivar etiqueta" });
    }
  },
  
  deleteEtiqueta: async (req, res) => {
    try {
      const { id } = req.params;
      await etiquetaSistema.findByIdAndDelete(id);
      res.json({ mensaje: "Etiqueta eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar la etiqueta" });
    }
  },

  
};

export default httpEtiquetaSistema;
