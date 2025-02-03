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
import { Delete } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
import {
  addHealthProblem,
  removeHealthProblem,
  setDateOfBirth,
  setFullName,
  setHasHealthProblems,
  setHasTattooOrPiercing,
  setHeight,
  setManequimSize,
  setNewHealthProblem,
  setSex,
  setWeight,
} from "../../../redux/PersonalInformationSlice"

const PersonalFields = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const personalInformation = useAppSelector(
    (state) => state.personalInformation
  )

  const handleAddHealthProblem = () => {
    if (personalInformation.newHealthProblem.trim() !== "") {
      dispatch(addHealthProblem(personalInformation.newHealthProblem))
      dispatch(setNewHealthProblem(""))
    }
  }

  const handleRemoveHealthProblem = (index: number) => {
    dispatch(removeHealthProblem(index))
  }

  const handleChange = (field: string, value: string | number) => {
    switch (field) {
      case "fullName":
        dispatch(setFullName(value as string))
        break
      case "dateOfBirth":
        dispatch(setDateOfBirth(value as string))
        break
      case "sex":
        dispatch(setSex(value as string))
        break
      case "height":
        dispatch(setHeight(value as number))
        break
      case "weight":
        dispatch(setWeight(value as number))
        break
      case "manequimSize":
        dispatch(setManequimSize(value as string))
        break
    }
  }

  return (
    <>
      <Grid2 size={12}>
        <TextField
          fullWidth
          margin="normal"
          label={t("fullName")}
          variant="outlined"
          value={personalInformation.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
      </Grid2>
      <Grid2 size={6}>
        <TextField
          fullWidth
          margin="normal"
          label={t("dateOfBirth")}
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={personalInformation.dateOfBirth}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
        />
      </Grid2>
      <Grid2 size={6}>
        <TextField
          select
          label={t("sex")}
          fullWidth
          value={personalInformation.sex}
          onChange={(e) => handleChange("sex", e.target.value)}
          sx={{ my: 2 }}
        >
          <MenuItem value="male">{t("male")}</MenuItem>
          <MenuItem value="female">{t("female")}</MenuItem>
          <MenuItem value="other">{t("other")}</MenuItem>
        </TextField>
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          margin="normal"
          label={t("height")}
          variant="outlined"
          type="number"
          value={personalInformation.height}
          onChange={(e) => handleChange("height", Number(e.target.value))}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          margin="normal"
          label={t("weight")}
          variant="outlined"
          type="number"
          value={personalInformation.weight}
          onChange={(e) => handleChange("weight", Number(e.target.value))}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          select
          label={t("manequimSize")}
          fullWidth
          value={personalInformation.manequimSize}
          onChange={(e) => handleChange("manequimSize", e.target.value)}
          sx={{ my: 2 }}
        >
          <MenuItem value="P">P</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="G">G</MenuItem>
          <MenuItem value="GG">GG</MenuItem>
          <MenuItem value="XL">XL</MenuItem>
        </TextField>
      </Grid2>

      <Grid2 size={6}>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">{t("haveHealthProblems")}</FormLabel>
          <RadioGroup
            aria-label="haveHealthProblems"
            name="haveHealthProblems"
            value={personalInformation.hasHealthProblems}
            onChange={(e) => dispatch(setHasHealthProblems(e.target.value))}
          >
            <Box>
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={t("yes")}
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={t("no")}
              />
            </Box>
          </RadioGroup>
        </FormControl>
      </Grid2>
      {personalInformation.hasHealthProblems === "yes" && (
        <Grid2 size={12}>
          <TextField
            fullWidth
            margin="normal"
            label={t("addHealthProblem")}
            variant="outlined"
            value={personalInformation.newHealthProblem}
            onChange={(e) => dispatch(setNewHealthProblem(e.target.value))}
          />
          <Button variant="contained" onClick={handleAddHealthProblem}>
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
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">{t("haveTattooOrPiercing")}</FormLabel>
        <RadioGroup
          aria-label="haveTattooOrPiercing"
          name="haveTattooOrPiercing"
          value={personalInformation.hasTattooOrPiercing}
          onChange={(e) => dispatch(setHasTattooOrPiercing(e.target.value))}
        >
          <Box>
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label={t("yes")}
            />
            <FormControlLabel value="no" control={<Radio />} label={t("no")} />
          </Box>
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default PersonalFields
