import { useEffect, useState } from "react"
import api from "../../api"

const URL = "/users"

type User = {
  id: string
  login: string
  email: string
  createdAt: string
  isAdmin: boolean
}

type UseUsers = () => {
  users?: User[]
  removeUser: (id: string) => Promise<void>
}

export const useUsers: UseUsers = () => {
  const [users, setUsers] = useState<User[]>()

  const fetchUsers = async () => {
    const res = await api.get<User[]>(URL)

    setUsers(res.data)
  }

  const removeUser = async (id: string) => {
    const res = await api.delete(`${URL}/${id}`)

    if (res.status === 200) {
      setUsers((prev) => prev?.filter((u) => u.id != id))
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return { users, removeUser }
}
