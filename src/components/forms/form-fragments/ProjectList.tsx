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
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
import { useState } from "react"
import { addProject, removeProject } from "../../../redux/EducationWorkSlice"
import useFormatDate from "../../../hooks/useFormatDate"
import { Add, Delete } from "@mui/icons-material"

const ProjectList = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { projects } = useAppSelector((state) => state.educationWork)

  const [project, setProject] = useState({
    startDate: "",
    endDate: "",
    projectName: "",
    responsibilities: "",
  })

  const [errors, setErrors] = useState({
    startDate: false,
    endDate: false,
    projectName: false,
    responsibilities: false,
  })

  const handleAddProject = () => {
    const newErrors = {
      startDate: !project.startDate,
      endDate: !project.endDate,
      projectName: !project.projectName,
      responsibilities: !project.responsibilities,
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    dispatch(addProject(project))
    setProject({
      startDate: "",
      endDate: "",
      projectName: "",
      responsibilities: "",
    })
    setErrors({
      startDate: false,
      endDate: false,
      projectName: false,
      responsibilities: false,
    })
  }

  const handleRemoveProject = (index: number) => {
    dispatch(removeProject(index))
  }

  return (
    <>
      <Grid2 size={12}>
        <Typography variant="h6">{t("projects")}</Typography>
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          label={t("startDate")}
          type="date"
          value={project.startDate}
          onChange={(e) =>
            setProject({ ...project, startDate: e.target.value })
          }
          error={errors.startDate}
          helperText={errors.startDate ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          label={t("endDate")}
          fullWidth
          type="date"
          value={project.endDate}
          onChange={(e) => setProject({ ...project, endDate: e.target.value })}
          error={errors.endDate}
          helperText={errors.endDate ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          fullWidth
          label={t("projectName")}
          value={project.projectName}
          onChange={(e) =>
            setProject({ ...project, projectName: e.target.value })
          }
          error={errors.projectName}
          helperText={errors.projectName ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={12}>
        <TextField
          fullWidth
          label={t("responsibilities")}
          value={project.responsibilities}
          onChange={(e) =>
            setProject({ ...project, responsibilities: e.target.value })
          }
          error={errors.responsibilities}
          helperText={errors.responsibilities ? t("requiredField") : ""}
        />
      </Grid2>
      <Grid2 size={12}>
        <Button onClick={handleAddProject} startIcon={<Add />}>
          {t("addProject")}
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <List>
          {projects.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${useFormatDate(item.startDate)} - ${useFormatDate(
                  item.endDate
                )} : ${item.projectName}`}
                secondary={item.responsibilities}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveProject(index)}
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

export default ProjectList
