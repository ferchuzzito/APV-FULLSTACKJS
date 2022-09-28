import { useContext } from 'react'
import PacientesContext from '../context/Pacientes.provider'

const usePacientes = () => {
    return useContext(PacientesContext)
}

export default usePacientes