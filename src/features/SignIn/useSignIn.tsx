import { useLocation, useNavigate } from "react-router-dom"
import api from "../../api"
import { useAuth } from "../../hooks/useAuth"

const URL = "/auth/sign-in"

type SignInDto = {
  login: string
  password: string
}

type UseSignIn = () => {
  submit: (data: SignInDto) => Promise<void>
}

export const useSignIn: UseSignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { authenticate } = useAuth()

  const from = location.state?.from?.pathname || "/"

  const submit = async (data: SignInDto) => {
    const res = await api.post(URL, data)

    if (res.status === 200) {
      await authenticate()
      navigate(from)
    }
  }

  return {
    submit,
  }
}
