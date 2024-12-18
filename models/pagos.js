import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
  idCliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  fecha: { type: Date, required: true },
  valor: { type: Number, required: true },
  periodo: { type: String, required: true },
  anio: { type: Number, required: true },
  estado: { type: Number, default: 1 }, // 1: Activo, 0: Inactivo
});

export default mongoose.model("Pago", pagoSchema);
