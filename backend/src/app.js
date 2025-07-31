import express from "express";
import paciente from "./routes/paciente.routes.js";
import veterinario from "./routes/veterinario.routes.js";
import cors from 'cors';
import corsOptions from './config/cors.js'; // Ajusta la ruta si es necesario
import dotenv from 'dotenv';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/veterinario", veterinario);
app.use("/api/paciente", paciente);
export default app;
