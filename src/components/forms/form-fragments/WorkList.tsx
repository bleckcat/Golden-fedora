import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
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
import { Add, Delete } from "@mui/icons-material"
import useFormatDate from "../../../hooks/useFormatDate"
import { addWorkHistory, removeWork } from "../../../redux/EducationWorkSlice"

const WorkList = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { workHistory } = useAppSelector((state) => state.educationWork)

  const [work, setWork] = useState({
    startDate: "",
    endDate: "",
    companyName: "",
    responsibilities: "",
  })

  const [errors, setErrors] = useState({
    startDate: false,
    endDate: false,
    companyName: false,
    responsibilities: false,
  })

  const handleAddWork = () => {
    const newErrors = {
      startDate: !work.startDate,
      endDate: !work.endDate,
      companyName: !work.companyName,
      responsibilities: !work.responsibilities,
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    dispatch(addWorkHistory(work))
    setWork({
      startDate: "",
      endDate: "",
      companyName: "",
      responsibilities: "",
    })
    setErrors({
      startDate: false,
      endDate: false,
      companyName: false,
      responsibilities: false,
    })
  }

  const handleRemoveWork = (index: number) => {
    dispatch(removeWork(index))
  }

  return (
    <>
      <Grid2 size={12}>
        <Typography variant="h6">{t("workHistory")}</Typography>
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          label={t("startDate")}
          type="date"
          value={work.startDate}
          onChange={(e) => setWork({ ...work, startDate: e.target.value })}
          error={errors.startDate}
          helperText={errors.startDate ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          label={t("endDate")}
          type="date"
          value={work.endDate}
          onChange={(e) => setWork({ ...work, endDate: e.target.value })}
          error={errors.endDate}
          helperText={errors.endDate ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          label={t("companyName")}
          value={work.companyName}
          onChange={(e) => setWork({ ...work, companyName: e.target.value })}
          error={errors.companyName}
          helperText={errors.companyName ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={12}>
        <TextField
          fullWidth
          label={t("responsibilities")}
          value={work.responsibilities}
          onChange={(e) =>
            setWork({ ...work, responsibilities: e.target.value })
          }
          error={errors.responsibilities}
          helperText={errors.responsibilities ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={12}>
        <Button onClick={handleAddWork} startIcon={<Add />}>
          {t("addWork")}
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <List>
          {workHistory.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${useFormatDate(item.startDate)} - ${useFormatDate(
                  item.endDate
                )} : ${item.companyName}`}
                secondary={item.responsibilities}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveWork(index)}
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

export default WorkList
