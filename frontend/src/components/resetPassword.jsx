import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "./Alerta";
import clienteAxios from "../config/axios";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }
    try {
      const { data } = await clienteAxios.post("/veterinario/password", {
        email,
      });
      setAlerta({ msg: data.msg, error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 text-center text-6xl font-black break-words">
          RECUPERA TU CUENTA Y NO PIERDAS ACCESO A TUS {""}
          <span className="text-black">PACIENTES</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Recuepar Password"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿no tienes una cuenta? Registrate
          </Link>
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesion
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ResetPassword;
