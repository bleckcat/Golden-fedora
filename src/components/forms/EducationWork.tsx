import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TextField,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid2,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  addStudyHistory,
  addCertification,
  addWorkHistory,
  addProject,
  setEnglishLevel,
  setJapaneseLevel,
} from "../../redux/EducationWorkSlice";

const EducationWork = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    studyHistory,
    certifications,
    workHistory,
    projects,
    englishLevel,
    japaneseLevel,
  } = useAppSelector((state) => state.educationWork);

  const [study, setStudy] = useState({
    startDate: "",
    endDate: "",
    universityName: "",
  });

  const [certification, setCertification] = useState({
    startDate: "",
    endDate: "",
    certificationName: "",
  });

  const [work, setWork] = useState({
    startDate: "",
    endDate: "",
    companyName: "",
    responsibilities: "",
  });

  const [project, setProject] = useState({
    startDate: "",
    endDate: "",
    projectName: "",
    responsibilities: "",
  });

  const handleAddStudy = () => {
    dispatch(addStudyHistory(study));
    setStudy({ startDate: "", endDate: "", universityName: "" });
  };

  const handleAddCertification = () => {
    dispatch(addCertification(certification));
    setCertification({ startDate: "", endDate: "", certificationName: "" });
  };

  const handleAddWork = () => {
    dispatch(addWorkHistory(work));
    setWork({
      startDate: "",
      endDate: "",
      companyName: "",
      responsibilities: "",
    });
  };

  const handleAddProject = () => {
    dispatch(addProject(project));
    setProject({
      startDate: "",
      endDate: "",
      projectName: "",
      responsibilities: "",
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            label={t("endDate")}
            type="date"
            value={study.endDate}
            onChange={(e) => setStudy({ ...study, endDate: e.target.value })}
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
                  primary={`${formatDate(item.startDate)} - ${formatDate(item.endDate)} : ${item.universityName}`}
                />
                <IconButton edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid2>
      </Grid2>
      <Grid2 size={12} container spacing={2}>
        <Grid2 size={12}>
          <Typography variant="h6">{t("certifications")}</Typography>
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            label={t("startDate")}
            type="date"
            value={certification.startDate}
            onChange={(e) =>
              setCertification({ ...certification, startDate: e.target.value })
            }
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            label={t("endDate")}
            type="date"
            value={certification.endDate}
            onChange={(e) =>
              setCertification({ ...certification, endDate: e.target.value })
            }
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            label={t("certificationName")}
            value={certification.certificationName}
            onChange={(e) =>
              setCertification({
                ...certification,
                certificationName: e.target.value,
              })
            }
          />
        </Grid2>
        <Grid2 size={12}>
          <Button onClick={handleAddCertification} startIcon={<Add />}>
            {t("addCertification")}
          </Button>
        </Grid2>
        <Grid2 size={12}>
          <List>
            {certifications.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${formatDate(item.startDate)} - ${formatDate(item.endDate)} : ${item.certificationName}`}
                />
                <IconButton edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid2>
      </Grid2>
      <Grid2 size={12} container spacing={2}>
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
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            label={t("endDate")}
            type="date"
            value={work.endDate}
            onChange={(e) => setWork({ ...work, endDate: e.target.value })}
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            label={t("companyName")}
            value={work.companyName}
            onChange={(e) => setWork({ ...work, companyName: e.target.value })}
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
                  primary={`${formatDate(item.startDate)} - ${formatDate(item.endDate)} : ${item.companyName}`}
                  secondary={item.responsibilities}
                />
                <IconButton edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid2>
      </Grid2>
      <Grid2 size={12} container spacing={2}>
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
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            label={t("endDate")}
            fullWidth
            type="date"
            value={project.endDate}
            onChange={(e) => setProject({ ...project, endDate: e.target.value })}
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
                  primary={`${formatDate(item.startDate)} - ${formatDate(item.endDate)} : ${item.projectName}`}
                  secondary={item.responsibilities}
                />
                <IconButton edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default EducationWork;