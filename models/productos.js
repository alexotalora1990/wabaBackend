import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  imagen: { type: String, default: null }, // URL opcional
  estado: { type: Number, default: 1 }, // 1: Activo, 0: Inactivo
});

export default mongoose.model("Producto", productoSchema);
