import mongoose from "mongoose";

const etiquetaSistemaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String }, 
   estado:{type:Number, default:1}
});

export default mongoose.model("EtiquetaSistema", etiquetaSistemaSchema);
