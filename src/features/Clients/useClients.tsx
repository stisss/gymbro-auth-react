import { useEffect, useState } from "react"
import api from "../../api"

const URL = "/clients"

type Client = {
  id: string
  name: string
  secret: string
  redirectUris: string[]
  scopes: string[]
  createdAt: string
  createdById: string
}

type UseClients = () => {
  clients: Client[]
  removeClient: (id: string) => Promise<void>
}

export const useClients: UseClients = () => {
  const [clients, setClients] = useState<Client[]>([])

  const fetchClients = async () => {
    const res = await api.get<Client[]>(URL)

    setClients(res.data)
  }

  const removeClient = async (id: string) => {
    const res = await api.delete(`${URL}/${id}`)

    if (res.status === 200) {
      fetchClients()
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return {
    clients,
    removeClient,
  }
}
