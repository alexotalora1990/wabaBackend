import mongoose from "mongoose";

const campaniasSistemaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  pasos: [
    {
      paso: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  estado: { type: Number, default: 1 }, 
});

export default mongoose.model("CampaniasSistema", campaniasSistemaSchema);
