import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "./Alerta";
const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;
  const [cuentaConfirmada, setcuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `veterinario/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setAlerta({ msg: data.msg, error: false });
        setcuentaConfirmada(true);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 text-center text-6xl font-black break-words">
          CONFIRMA TU CUENTA Y ADMINISTRA A TUS {""}
          <span className="text-black">PACIENTES</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesion
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
