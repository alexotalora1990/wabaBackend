import mongoose from "mongoose";

const campaniasClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cliente: { type: String, required: true }, // Identificación del cliente (puede ser ID o nombre)
  pasos: [
    {
      paso: { type: String, required: true },
      link: { type: String, required: true },
    }, 
  ],
  estado: { type: Number, default: 1 }, // 1: Activo, 0: Inactivo
});

export default mongoose.model("CampaniasCliente", campaniasClienteSchema);
