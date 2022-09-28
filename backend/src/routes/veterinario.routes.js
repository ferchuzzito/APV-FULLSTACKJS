import { Router } from "express";
const router = Router();
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  resetPassword,
  comprobarToken,
  newPassword,
  actualizarPerfil,
  actualizarPassword
} from "../controllers/veterinario.controller.js";
import checkAuth from "../middleware/auth.middleware.js";

router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/password", resetPassword);
router.route("/password/:token").get(comprobarToken).post(newPassword);

router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil);
router.put("/resetpassword", checkAuth, actualizarPassword);
export default router;
