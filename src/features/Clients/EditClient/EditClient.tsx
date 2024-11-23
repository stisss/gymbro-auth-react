import { BaseSyntheticEvent } from "react"
import { Controller, useForm } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Checkbox from "@mui/material/Checkbox"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import { EditClientPayload, Scope, useEditClient } from "./useEditClient"

type FormInputs = EditClientPayload

const SCOPES = ["EMAIL", "LOGIN"] as Scope[]

const cardStyle = {
  maxWidth: "600px",
  width: "40%",
  margin: "0 auto",
  padding: "20px",
  mt: 4,
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export const EditClient: React.FC = () => {
  const { editClient, initialData } = useEditClient()

  if (!initialData) {
    return <CircularProgress size={100} />
  }

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h4" mb={2} textAlign="left">
          Edit client
        </Typography>
        <EditClientForm initialData={initialData} editClient={editClient} />
      </CardContent>
    </Card>
  )
}

type EditClientFormProps = {
  initialData: EditClientPayload
  editClient: (data: EditClientPayload) => Promise<void>
}

const EditClientForm: React.FC<EditClientFormProps> = ({
  editClient,
  initialData,
}) => {
  // TODO: handle errros
  const { register, handleSubmit, control } = useForm<FormInputs>({
    defaultValues: initialData,
  })

  const onSubmit = (data: FormInputs) => {
    editClient(data)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Name"
        {...register("name", {
          required: "This fields is required",
          minLength: { message: "Too short", value: 1 },
        })}
      />

      <TextField
        label="Secret"
        {...register("secret", {
          required: "This fields is required",
          minLength: { message: "Too short", value: 8 },
        })}
      />

      <Controller
        control={control}
        name="scopes"
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <FormControl>
            <InputLabel id="scopes-input-label">Scopes</InputLabel>
            <Select
              {...register("scopes")}
              id="scopes-input"
              labelId="scopes-input-label"
              multiple
              value={value}
              MenuProps={MenuProps}
              onChange={({ target: { value: v } }) =>
                onChange(typeof v === "string" ? v.split(",") : v)
              }
              input={<OutlinedInput label="Scopes" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {SCOPES.map((s) => (
                <MenuItem key={s} value={s}>
                  <Checkbox checked={value?.includes(s)} />
                  <ListItemText primary={s} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="redirectUris"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            {...register("redirectUris")}
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(_, v) => {
              onChange(v)
            }}
            onBlur={({ target: { value: v } }: BaseSyntheticEvent) => {
              if (!v || value?.includes(v)) return
              onChange([...value, v])
            }}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => {
                const { key, ...props } = getTagProps({ index })
                return (
                  <Chip
                    key={key}
                    variant="outlined"
                    label={option}
                    {...props}
                  />
                )
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Redirect URIs"
                placeholder="Add URI"
              />
            )}
          />
        )}
      />

      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  )
}
