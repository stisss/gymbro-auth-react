import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api"

const URL = "/clients"

export enum Scope {
  EMAIL = "EMAIL",
  LOGIN = "LOGIN",
}

export type EditClientPayload = {
  name: string
  secret: string
  redirectUris: string[]
  scopes: Scope[]
}

type UseEditClient = () => {
  editClient: (payload: EditClientPayload) => Promise<void>
  initialData?: EditClientPayload
}

export const useEditClient: UseEditClient = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState<EditClientPayload>()

  const editClient = async (payload: EditClientPayload) => {
    const res = await api.put(`${URL}/${params.id}`, payload)

    if (res.status !== 201) {
      // TODO: handle errors
    }

    navigate("/clients")
  }

  const fetchClient = async (): Promise<void> => {
    const res = await api.get<EditClientPayload>(`${URL}/${params.id}`)

    if (res.status !== 200) {
      // TODO: handle error
    }

    const payload = {
      name: res.data.name,
      secret: res.data.secret,
      redirectUris: res.data.redirectUris,
      scopes: res.data.scopes,
    }

    setInitialData(payload)
  }

  useEffect(() => {
    if (!!initialData) return
    fetchClient()
  }, [])

  return {
    editClient,
    initialData,
  }
}
