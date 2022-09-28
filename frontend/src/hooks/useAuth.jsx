import { useContext } from "react";
import AuthContext from "../context/Auth.provider";

const useAuth = () => {
     return useContext(AuthContext);
}

export default useAuth;