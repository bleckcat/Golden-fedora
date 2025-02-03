import { useTranslation } from "react-i18next"
import { TextField, MenuItem, Grid2, Alert } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import {
  setEnglishLevel,
  setJapaneseLevel,
} from "../../redux/EducationWorkSlice"
import { enableStepperNextButton } from "../../redux/GlobalSlice"
import StudyList from "./form-fragments/StudyList"
import CertificationList from "./form-fragments/CertificationList"
import WorkList from "./form-fragments/WorkList"
import ProjectList from "./form-fragments/ProjectList"
import { useEffect, useState } from "react"

const EducationWork = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { englishLevel, japaneseLevel, studyHistory, workHistory } =
    useAppSelector((state) => state.educationWork)

  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const isValid = studyHistory.length > 0 && workHistory.length > 0
    dispatch(enableStepperNextButton(isValid))
    setShowAlert(!isValid)
  }, [studyHistory, workHistory, dispatch])

  return (
    <Grid2 container spacing={2}>
      {showAlert && (
        <Grid2 size={12}>
          <Alert severity="warning">{t("youNeedToAddEntries")}</Alert>
        </Grid2>
      )}
      <Grid2 size={6}>
        <TextField
          fullWidth
          label={t("englishLevel")}
          select
          value={englishLevel}
          onChange={(e) => dispatch(setEnglishLevel(e.target.value))}
        >
          <MenuItem value="beginner">{t("beginner")}</MenuItem>
          <MenuItem value="intermediate">{t("intermediate")}</MenuItem>
          <MenuItem value="advanced">{t("advanced")}</MenuItem>
        </TextField>
      </Grid2>
      <Grid2 size={6}>
        <TextField
          fullWidth
          label={t("japaneseLevel")}
          select
          value={japaneseLevel}
          onChange={(e) => dispatch(setJapaneseLevel(e.target.value))}
        >
          <MenuItem value="beginner">{t("beginner")}</MenuItem>
          <MenuItem value="intermediate">{t("intermediate")}</MenuItem>
          <MenuItem value="advanced">{t("advanced")}</MenuItem>
        </TextField>
      </Grid2>
      <Grid2 size={12} container spacing={2}>
        <StudyList />
      </Grid2>
      <Grid2 size={12} container spacing={2}>
        <WorkList />
      </Grid2>
      <Grid2 size={12} container spacing={2}>
        <CertificationList />
      </Grid2>
      <Grid2 size={12} container spacing={2}>
        <ProjectList />
      </Grid2>
    </Grid2>
  )
}

export default EducationWork
