import { useForm, SubmitHandler } from "react-hook-form"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { useSignIn } from "./useSignIn"

interface FormInputs {
  email: string
  login: string
  password: string
}

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const { submit } = useSignIn()

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    submit(data)
  }

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  }

  const cardStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    mt: 4,
  }

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ marginBottom: "20px" }}>
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formStyle}>
          <TextField
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Login"
            {...register("login", {
              required: "Login is required",
              minLength: {
                value: 4,
                message: "Login must have at leas 4 characters",
              },
            })}
            error={!!errors.login}
            helperText={errors.login?.message}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 8 characters",
              },
              maxLength: {
                value: 64,
                message: "Password must not be longer than 64 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
