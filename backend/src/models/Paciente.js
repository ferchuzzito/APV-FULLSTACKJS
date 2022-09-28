import { Schema, model } from "mongoose";

const pacienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    propietario: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    sintomas: {
      type: String,
      required: true,
    },
    veterinario: {
      type: Schema.Types.ObjectId,
      ref: "Veterinario",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("paciente", pacienteSchema);
