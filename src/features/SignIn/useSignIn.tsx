import api from "../../api"

const URL = "/auth/sign-in"

type SignUpDto = {
  login: string
  email: string
  password: string
}

type UseSignUp = () => {
  submit: (data: SignUpDto) => Promise<void>
}

export const useSignUp: UseSignUp = () => {
  const submit = async (data: SignUpDto) => {
    const res = await api.post(URL, data)
    console.log(res)
  }

  return {
    submit,
  }
}
