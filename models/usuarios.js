import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, unique: true, required: true },
  contrasena: { type: String, required: true },
  telefono: { type: String, unique: true, required: true },
  rol: { type: String, required: true },
  idAmway: { type: String },
  tipo: { type: String, required: true },
  wp: { type: String, required: true },
  puertoBot: { type: String, required: true },
  estado: { type: Number, default: 1 },
  membrecia: {
    diaCorte: { type: Date, required: true }, 
    historial: [
      {
        fecha: { type: Date, required: true }, 
        periodo: { type: String, required: true }, 
        valor: { type: Number, required: true } 
      }
    ]
  }
});

export default mongoose.model("Usuario", usuarioSchema);
