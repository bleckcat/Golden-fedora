import { useTranslation } from "react-i18next"
import TextField from "@mui/material/TextField"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import {
  Box,
  Grid2,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material"
import { CloudUpload, Delete } from "@mui/icons-material"
import VisuallyHiddenInput from "../../styled/VisuallyHiddenInput"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import {
  setPicture,
  setFullName,
  setDateOfBirth,
  setSex,
  setHeight,
  setWeight,
  setHasHealthProblems,
  addHealthProblem,
  removeHealthProblem,
  setHasTattooOrPiercing,
  setManequimSize,
  setNewHealthProblem,
} from "../../redux/PersonalInformationSlice"

const PersonalInformation = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const personalInformation = useAppSelector(
    (state) => state.personalInformation
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      const imgUrl = URL.createObjectURL(file)
      dispatch(setPicture(imgUrl))
    }
  }

  const handleAddHealthProblem = () => {
    if (personalInformation.newHealthProblem.trim() !== "") {
      dispatch(addHealthProblem(personalInformation.newHealthProblem))
      dispatch(setNewHealthProblem(""))
    }
  }

  const handleRemoveHealthProblem = (index: number) => {
    dispatch(removeHealthProblem(index))
  }

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Box width={30 * 4} height={40 * 4} margin="auto" bgcolor={"Highlight"}>
          <img
            src={personalInformation.picture ?? ""}
            alt="3x4 picture uploaded by the user"
            width={30 * 4}
            height={40 * 4}
          />
        </Box>
        <Box margin="auto" width="fit-content" pt={2}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            {t("uploadPicture")}
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </Button>
        </Box>
      </Grid2>
      <Grid2 size={12}>
        <TextField
          fullWidth
          margin="normal"
          label={t("fullName")}
          variant="outlined"
          value={personalInformation.fullName}
          onChange={(e) => dispatch(setFullName(e.target.value))}
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
          onChange={(e) => dispatch(setDateOfBirth(e.target.value))}
        />
      </Grid2>

      <Grid2 size={6}>
        <TextField
          select
          label={t("sex")}
          fullWidth
          value={personalInformation.sex}
          onChange={(e) => dispatch(setSex(e.target.value))}
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
          onChange={(e) => dispatch(setHeight(Number(e.target.value)))}
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
          onChange={(e) => dispatch(setWeight(Number(e.target.value)))}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          select
          label={t("manequimSize")}
          fullWidth
          value={personalInformation.manequimSize}
          onChange={(e) => dispatch(setManequimSize(e.target.value))}
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
            onChange={(e) => dispatch(setHasHealthProblems(e.target.value))}
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
    </Grid2>
  )
}

export default PersonalInformation
