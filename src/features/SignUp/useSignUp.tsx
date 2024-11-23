import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import api from "../../api"

const URL = "/auth/sign-up"

type SignUpDto = {
  login: string
  email: string
  password: string
}

type UseSignUp = () => {
  submit: (data: SignUpDto) => Promise<void>
}

export const useSignUp: UseSignUp = () => {
  const navigate = useNavigate()

  const { authenticate } = useAuth()

  const submit = async (data: SignUpDto) => {
    const res = await api.post(URL, data)

    if (res.status === 200) {
      await authenticate()
      navigate("/")
    }
  }

  return {
    submit,
  }
}
