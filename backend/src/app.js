import express from "express";
import paciente from "./routes/paciente.routes.js";
import veterinario from "./routes/veterinario.routes.js";
import cors from 'cors';

const app = express();
const dominiosPermitidos = ["http://localhost:5173", "http://127.0.0.1:5173"];
const corsOptions = {
     origin: function(origin, callback) {
          if (dominiosPermitidos.indexOf(origin) !== -1) {
               callback(null, true);
          } else {
               callback(new Error("No Permitido por CORS"))
          }
     },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/veterinario", veterinario);
app.use("/api/paciente", paciente);
export default app;
