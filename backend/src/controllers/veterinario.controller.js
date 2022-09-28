import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarID.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailResetPassword from "../helpers/emailResetPassword.js";

const registrar = async (req, res) => {
  const { email, nombre } = req.body;

  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const newveterinario = new Veterinario(req.body);
    const veterinariosaved = await newveterinario.save();
    emailRegistro({ email, nombre, token: veterinariosaved.token });

    res.json(veterinariosaved);
  } catch (error) {
    console.log(error);
  }
};

const perfil = async (req, res) => {
  const { veterinario } = req;
  res.send({ veterinario });
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  const existeVeterinario = await Veterinario.findOne({ email });
  if (!existeVeterinario) {
    const error = new Error("El email no es valido");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();
    emailResetPassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token,
    });
    res.send({ msg: "mensaje enviado a tu email" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Veterinario.findOne({ token });
  if (tokenValido) {
    res.json({ msg: "token Valido y el usuario existe" });
  } else {
    const error = new Error("token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });

  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const confirmarUsuario = await Veterinario.findOne({ token });
  if (!confirmarUsuario) {
    const error = new Error("token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    confirmarUsuario.token = null;
    confirmarUsuario.confirmado = true;
    await confirmarUsuario.save();
    res.json({ msg: "usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Veterinario.findOne({ email });
  if (!usuario) {
    const error = new Error("el usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  if (!usuario.confirmado) {
    const error = new Error("cuenta no confirmada");
    return res.status(403).json({ msg: error.message });
  }
  if (await usuario.comprobarPass(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error("Password incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const actualizarPerfil = async (req, res) => {
  const veterinario = await Veterinario.findById(req.params.id);
  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  const { email } = req.body;
  if (veterinario.email !== req.body.email) {
    const existeEmail = await Veterinario.findOne({ email });

    if (existeEmail) {
      const error = new Error("Ese email ya esta en uso");
      return res.status(400).json({ msg: error.message });
    }
  }

  try {
    veterinario.nombre = req.body.nombre;
    veterinario.email = req.body.email;
    veterinario.web = req.body.web;
    veterinario.telefono = req.body.telefono;

    const veterianrioActualizado = await veterinario.save();
    res.json(veterianrioActualizado);
  } catch (error) {
    console.log(error);
  }
};

const actualizarPassword = async (req, res) => {
  const { id } = req.veterinario;
  const { pwd_actual, pwd_nuevo } = req.body;

  const veterinario = await Veterinario.findById(id);
  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  if (await veterinario.comprobarPassword(pwd_actual)) {

    veterinario.password = pwd_nuevo;
    await veterinario.save();
    res.json({ msg: "Password Almacenado Correctamente" });
  } else {
    const error = new Error("El Password Actual es Incorrecto");
    return res.status(400).json({ msg: error.message });
  }
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  resetPassword,
  comprobarToken,
  newPassword,
  actualizarPerfil,
  actualizarPassword
};
