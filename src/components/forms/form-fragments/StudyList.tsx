import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
import { addStudyHistory, removeStudy } from "../../../redux/EducationWorkSlice"
import { Add, Delete } from "@mui/icons-material"
import {
  Button,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material"
import useFormatDate from "../../../hooks/useFormatDate"

const StudyList = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { studyHistory } = useAppSelector((state) => state.educationWork)
  const [study, setStudy] = useState({
    startDate: "",
    endDate: "",
    universityName: "",
  })
  const [errors, setErrors] = useState({
    startDate: false,
    endDate: false,
    universityName: false,
  })

  const handleAddStudy = () => {
    const newErrors = {
      startDate: !study.startDate,
      endDate: !study.endDate,
      universityName: !study.universityName,
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    dispatch(addStudyHistory(study))
    setStudy({ startDate: "", endDate: "", universityName: "" })
    setErrors({ startDate: false, endDate: false, universityName: false })
  }

  const handleRemoveStudy = (index: number) => {
    dispatch(removeStudy(index))
  }

  return (
    <>
      <Grid2 size={12}>
        <Typography variant="h6">{t("studyHistory")}</Typography>
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          label={t("startDate")}
          type="date"
          value={study.startDate}
          onChange={(e) => setStudy({ ...study, startDate: e.target.value })}
          error={errors.startDate}
          helperText={errors.startDate ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          label={t("endDate")}
          type="date"
          value={study.endDate}
          onChange={(e) => setStudy({ ...study, endDate: e.target.value })}
          error={errors.endDate}
          helperText={errors.endDate ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          label={t("universityName")}
          value={study.universityName}
          onChange={(e) =>
            setStudy({ ...study, universityName: e.target.value })
          }
          error={errors.universityName}
          helperText={errors.universityName ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={12}>
        <Button onClick={handleAddStudy} startIcon={<Add />}>
          {t("addStudy")}
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <List>
          {studyHistory.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${useFormatDate(item.startDate)} - ${useFormatDate(
                  item.endDate
                )} : ${item.universityName}`}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveStudy(index)}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Grid2>
    </>
  )
}

export default StudyList
