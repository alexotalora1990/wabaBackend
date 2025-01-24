import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  correo: { type: String, unique: true, required: true },
  nombre: { type: String, required: true },
  wp: { type: String, required: true }, 
  estado: { type: Number, default: 1 }, 
  blacklist: {
    estado: { type: Number, default: 0}, 
    descripcion: { type: String }, 
  },
  etiquetas: [{ type: String }],
  campaña: [
    {
      idCampaña: { type: mongoose.Schema.Types.ObjectId, ref: "Campaña" },
      paso: { type: String}, 
      fecha: { type: Date, default: Date.now }, 
      estado: { type: String, default: "activo" }, 
    },
  ],
  documento: { type: String }, 
  direccion: { type: String }, 
  ciudad: { type: String }, 
  pais: { type: String }, 
});

export default mongoose.model("Cliente", clienteSchema);
