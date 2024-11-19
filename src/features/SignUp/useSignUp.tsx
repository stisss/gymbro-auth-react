import { useNavigate } from "react-router-dom"
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

  const submit = async (data: SignUpDto) => {
    const res = await api.post(URL, data)

    if (res.status === 200) {
      navigate("/")
    }
  }

  return {
    submit,
  }
}
