import { useNavigate } from "react-router-dom"
import api from "../../../api"

const URL = "/clients"

export enum Scope {
  EMAIL = "EMAIL",
  LOGIN = "LOGIN",
}

export type EditClientPayload = {
  name: string
  redirectUris: string[]
  scopes: Scope[]
}

type UseEditClient = () => {
  editClient: (id: string, payload: EditClientPayload) => Promise<void>
}

export const useEditClient: UseEditClient = () => {
  const navigate = useNavigate()

  const editClient = async (id: string, payload: EditClientPayload) => {
    const res = await api.put(`${URL}/${id}`, payload)

    if (res.status === 201) {
      navigate("/clients")
    }
    // TODO: handle errors
  }

  return { editClient }
}
