import mongoose from "mongoose";

const etiquetaSistemaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  segInteresado: { type: Boolean, default: false },
  segDownline: { type: Boolean, default: false },
  segNoInteresado: { type: Boolean, default: false },
  venta: { type: Number, default: 0 }, 
  estado:{type:Number, default:1}
});

export default mongoose.model("EtiquetaSistema", etiquetaSistemaSchema);
