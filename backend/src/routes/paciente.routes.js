import { Router } from "express";
const router = Router();
import checkAuth from "../middleware/auth.middleware.js";

import {
  addPaciente,
  getPacientes,
  getPaciente,
  updPaciente,
  delPaciente,
} from "../controllers/paciente.controller.js";

router.route("/").post(checkAuth, addPaciente).get(checkAuth, getPacientes);
router
  .route("/:id")
  .get(checkAuth, getPaciente)
  .put(checkAuth, updPaciente)
  .delete(checkAuth, delPaciente);

export default router;
