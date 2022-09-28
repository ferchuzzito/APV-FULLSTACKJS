import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "./Alerta";
const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const params = useParams();
  const { token } = params;
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `veterinario/password/${token}`;
        await clienteAxios(url);
        setAlerta({ msg: "coloca tu nuevo password", error: false });
        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: "hubo un error con el enlace", error: true });
      }
    };
    comprobarToken();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: "el password debe de llevar minimo 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = `veterinario/password/${token}`
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 text-center text-6xl font-black break-words">
          REESTABLECE TU PASSWORD Y NO PIERDAS ACCESO A TUS {""}
          <span className="text-black">PACIENTES</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 text-xl font-bold">
                  Nuevo Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Guardar Nuevo Password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>
            {passwordModificado && (
              <Link className="block text-center my-5 text-gray-500" to="/">
                Iniciar Sesion
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default NewPassword;
