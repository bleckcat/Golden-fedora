import { useTranslation } from "react-i18next"
import { TextField, MenuItem, Grid2 } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import {
  setEnglishLevel,
  setJapaneseLevel,
} from "../../redux/EducationWorkSlice"
import StudyList from "./form-fragments/studyList"
import CertificationList from "./form-fragments/CertificationList"
import WorkList from "./form-fragments/WorkList"
import ProjectList from "./form-fragments/ProjectList"

const EducationWork = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { englishLevel, japaneseLevel } = useAppSelector(
    (state) => state.educationWork
  )

  return (
    <Grid2 container spacing={2}>
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
        <CertificationList />
      </Grid2>
      <Grid2 size={12} container spacing={2}>
        <WorkList />
      </Grid2>
      <Grid2 size={12} container spacing={2}>
        <ProjectList />
      </Grid2>
    </Grid2>
  )
}

export default EducationWork
