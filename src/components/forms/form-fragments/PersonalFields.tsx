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
} from "@mui/material"
import { Add, Delete } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
import {
  addHealthProblem,
  handleChangePersonalInfo,
  removeHealthProblem,
} from "../../../redux/PersonalInformationSlice"
import { ChangeEvent } from "react"

const PersonalFields = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const personalInformation = useAppSelector(
    (state) => state.personalInformation
  )

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
    console.log(name, value)

    dispatch(handleChangePersonalInfo({ name, value }))
  }

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(handleChangePersonalInfo({ name, value: value === "true" }))
  }

  return (
    <>
      <Grid2 size={12}>
        <TextField
          fullWidth
          label={t("fullName")}
          name="fullName"
          variant="outlined"
          value={personalInformation.fullName}
          onChange={handleChange}
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
          value={personalInformation.dateOfBirth}
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={6}>
        <TextField
          select
          name="sex"
          label={t("sex")}
          fullWidth
          value={personalInformation.sex}
          onChange={handleChange}
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
          value={personalInformation.height}
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          name="weight"
          label={t("weight")}
          variant="outlined"
          type="number"
          value={personalInformation.weight}
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          select
          name="manequimSize"
          label={t("manequimSize")}
          fullWidth
          value={personalInformation.manequimSize}
          onChange={handleChange}
        >
          <MenuItem value="P">P</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="G">G</MenuItem>
          <MenuItem value="GG">GG</MenuItem>
          <MenuItem value="XL">XL</MenuItem>
        </TextField>
      </Grid2>

      <Grid2 size={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{t("hasHealthProblems")}</FormLabel>
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
        </FormControl>
      </Grid2>
      <Grid2 size={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{t("hasTattooOrPiercing")}</FormLabel>
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
            {personalInformation.healthProblems.map((problem, index) => (
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
            ))}
          </List>
        </Grid2>
      )}
    </>
  )
}

export default PersonalFields
