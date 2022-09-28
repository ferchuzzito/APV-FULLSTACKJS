import Paciente from "../models/Paciente.js";

const addPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;
  try {
    const pacienteGuardar = await paciente.save();
    res.json(pacienteGuardar);
  } catch (error) {
    console.log(error);
  }
};

const getPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);
  console.log(pacientes);
  res.json(pacientes);
};

const getPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);
  if (!paciente) {
    const error = new Error("paciente no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "accion no valida" });
  }
  res.json(paciente);
};
const updPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);
  if (!paciente) {
    const error = new Error("paciente no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "accion no valida" });
  }
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;
  try {
    const pacienteActualizar = await paciente.save();
    res.json(pacienteActualizar);
  } catch (error) {
    console.log(error);
  }
};
const delPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);
  if (!paciente) {
    const error = new Error("paciente no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "accion no valida" });
  }

  try {
    await paciente.deleteOne();
    res.json({msg: "paciente eliminado"});
  } catch (error) {
    console.log(error)
  }
};

export { addPaciente, getPacientes, getPaciente, updPaciente, delPaciente };
