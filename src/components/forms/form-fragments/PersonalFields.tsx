import {
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Grid2,
  Alert,
} from "@mui/material"
import { Add, Delete } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import { enableStepperNextButton } from "../../../redux/GlobalSlice"
import { ChangeEvent, useEffect } from "react"
import {
  addHealthProblem,
  handleChangePersonalInfo,
  removeHealthProblem,
  setErrors,
} from "../../../redux/PersonalInformationSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"

const PersonalFields = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const personalInformation = useAppSelector(
    (state) => state.personalInformation
  )

  const checkIfIsValid = () => {
    const isValid = !Object.values(personalInformation.errors).some(
      (error) => error
    )
    if (!isValid) {
      return dispatch(enableStepperNextButton(false))
    }
    dispatch(enableStepperNextButton(true))
  }

  const handleAddHealthProblem = () => {
    if (personalInformation.newHealthProblem.trim() !== "") {
      dispatch(addHealthProblem(personalInformation.newHealthProblem))
      dispatch(
        handleChangePersonalInfo({ name: "newHealthProblem", value: "" })
      )
    }
  }

  const handleRemoveHealthProblem = (index: number) => {
    dispatch(removeHealthProblem(index))
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    dispatch(handleChangePersonalInfo({ name, value }))

    if (value.trim() === "") {
      dispatch(setErrors({ ...personalInformation.errors, [name]: true }))
    } else {
      const newErrors = { ...personalInformation.errors }
      delete newErrors[name]
      dispatch(setErrors(newErrors))
    }
  }

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const booleanValue = value === "true"
    dispatch(handleChangePersonalInfo({ name, value: booleanValue }))
    if (name === "hasHealthProblems" && !booleanValue) {
      personalInformation.healthProblems.forEach((_: any, index: number) =>
        dispatch(removeHealthProblem(index))
      )
    }
  }

  useEffect(() => {
    checkIfIsValid()
  }, [personalInformation.errors])

  useEffect(() => {
    Object.keys(personalInformation).map((key) => {
      // @ts-ignore
      const value = personalInformation[key]

      if (`${value}`.length <= 0) {
        return dispatch(enableStepperNextButton(false))
      }
    })
  }, [])

  return (
    <>
      <Grid2 size={12}>
        <TextField
          fullWidth
          label={t("fullName")}
          name="fullName"
          required
          variant="outlined"
          value={personalInformation.fullName}
          onChange={handleChange}
          error={!!personalInformation.errors.fullName}
          helperText={
            personalInformation.errors.fullName ? t("requiredField") : ""
          }
        />
      </Grid2>
      <Grid2 size={6}>
        <TextField
          fullWidth
          name="dateOfBirth"
          label={t("dateOfBirth")}
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
          variant="outlined"
          required
          value={personalInformation.dateOfBirth}
          onChange={handleChange}
          error={!!personalInformation.errors.dateOfBirth}
          helperText={
            personalInformation.errors.dateOfBirth ? t("requiredField") : ""
          }
        />
      </Grid2>
      <Grid2 size={6}>
        <TextField
          select
          name="sex"
          label={t("sex")}
          required
          fullWidth
          value={personalInformation.sex}
          onChange={handleChange}
          error={!!personalInformation.errors.sex}
          helperText={personalInformation.errors.sex ? t("requiredField") : ""}
        >
          <MenuItem value="male">{t("male")}</MenuItem>
          <MenuItem value="female">{t("female")}</MenuItem>
          <MenuItem value="other">{t("other")}</MenuItem>
        </TextField>
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          name="height"
          label={t("height")}
          variant="outlined"
          type="number"
          required
          value={personalInformation.height}
          onChange={handleChange}
          error={!!personalInformation.errors.height}
          helperText={
            personalInformation.errors.height ? t("requiredField") : ""
          }
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          name="weight"
          required
          label={t("weight")}
          variant="outlined"
          type="number"
          value={personalInformation.weight}
          onChange={handleChange}
          error={!!personalInformation.errors.weight}
          helperText={
            personalInformation.errors.weight ? t("requiredField") : ""
          }
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          select
          name="manequimSize"
          required
          label={t("manequimSize")}
          fullWidth
          value={personalInformation.manequimSize}
          onChange={handleChange}
          error={!!personalInformation.errors.manequimSize}
          helperText={
            personalInformation.errors.manequimSize ? t("requiredField") : ""
          }
        >
          <MenuItem value="P">P</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="G">G</MenuItem>
          <MenuItem value="GG">GG</MenuItem>
          <MenuItem value="XL">XL</MenuItem>
        </TextField>
      </Grid2>

      <Grid2 size={6}>
        <FormControl
          component="fieldset"
          error={!!personalInformation.errors.healthProblems}
        >
          <FormLabel component="legend" required>
            {t("hasHealthProblems")}
          </FormLabel>
          <RadioGroup
            aria-label="hasHealthProblems"
            name="hasHealthProblems"
            value={personalInformation.hasHealthProblems}
            onChange={handleRadioChange}
          >
            <Box>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label={t("yes")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label={t("no")}
              />
            </Box>
          </RadioGroup>
          {personalInformation.errors.healthProblems && (
            <Alert severity="error">{t("requiredField")}</Alert>
          )}
        </FormControl>
      </Grid2>
      <Grid2 size={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend" required>
            {t("hasTattooOrPiercing")}
          </FormLabel>
          <RadioGroup
            aria-label="hasTattooOrPiercing"
            name="hasTattooOrPiercing"
            value={personalInformation.hasTattooOrPiercing}
            onChange={handleRadioChange}
          >
            <Box>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label={t("yes")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label={t("no")}
              />
            </Box>
          </RadioGroup>
        </FormControl>
      </Grid2>
      {personalInformation.hasHealthProblems && (
        <Grid2 size={12}>
          <TextField
            fullWidth
            required
            label={t("addHealthProblem")}
            variant="outlined"
            name="newHealthProblem"
            value={personalInformation.newHealthProblem}
            onChange={handleChange}
          />
          <Button
            startIcon={<Add />}
            onClick={handleAddHealthProblem}
            sx={{ mt: 2 }}
          >
            {t("addHealthProblem")}
          </Button>
          <List>
            {personalInformation.healthProblems.map(
              (problem: any, index: number) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveHealthProblem(index)}
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText primary={problem} />
                </ListItem>
              )
            )}
          </List>
        </Grid2>
      )}
    </>
  )
}

export default PersonalFields
