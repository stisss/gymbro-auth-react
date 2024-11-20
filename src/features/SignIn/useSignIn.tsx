import { useNavigate } from "react-router-dom"
import api from "../../api"

const URL = "/auth/sign-in"

type SignInDto = {
  login: string
  email: string
  password: string
}

type UseSignIn = () => {
  submit: (data: SignInDto) => Promise<void>
}

export const useSignIn: UseSignIn = () => {
  const navigate = useNavigate()

  const submit = async (data: SignInDto) => {
    const res = await api.post(URL, data)

    if (res.status === 200) {
      navigate("/")
    }
  }

  return {
    submit,
  }
}
