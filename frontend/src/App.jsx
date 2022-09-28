import { BrowserRouter, Routes, Route } from "react-router-dom";

import RutaProtegida from "./views/RutaProtegida";
import AdministrarPacientes from "./components/AdministrarPacientes";
import EditarPerfil from "./components/EditarPerfil";
import CambiarPassword from "./components/CambiarPassword";

import AuthView from "./views/AuthView";
import Login from "./components/Login";
import Registrar from "./components/Registrar";
import ResetPassword from "./components/resetPassword";
import NewPassword from "./components/newPassword";
import ConfirmarCuenta from "./components/ConfirmarCuenta";

import { AuthProvider } from "./context/Auth.provider";
import { PacientesProvider } from "./context/Pacientes.provider";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthView />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="ResetPassword" element={<ResetPassword />} />
              <Route path="ResetPassword/:token" element={<NewPassword />} />
              <Route path="confirmarCuenta/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="CambiarPassword" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
