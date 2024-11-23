import { useNavigate } from "react-router-dom"
import api from "../../../api"

const URL = "/clients"

export enum Scope {
  EMAIL = "EMAIL",
  LOGIN = "LOGIN",
}

export type CreateNewClientPayload = {
  name: string
  redirectUris: string[]
  scopes: Scope[]
}

type UseNewClient = () => {
  createNewClient: (payload: CreateNewClientPayload) => Promise<void>
}

export const useNewClient: UseNewClient = () => {
  const navigate = useNavigate()

  const createNewClient = async (payload: CreateNewClientPayload) => {
    const res = await api.post(URL, payload)

    if (res.status === 201) {
      navigate("/clients")
    }
    // TODO: handle errors
  }

  return { createNewClient }
}
