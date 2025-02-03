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
import { useState } from "react"
import useFormatDate from "../../../hooks/useFormatDate"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
import { useTranslation } from "react-i18next"
import {
  addCertification,
  removeCertification,
} from "../../../redux/EducationWorkSlice"

const CertificationList = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { certifications } = useAppSelector((state) => state.educationWork)

  const [certification, setCertification] = useState({
    startDate: "",
    endDate: "",
    certificationName: "",
  })

  const [errors, setErrors] = useState({
    startDate: false,
    endDate: false,
    certificationName: false,
  })

  const handleAddCertification = () => {
    const newErrors = {
      startDate: !certification.startDate,
      endDate: !certification.endDate,
      certificationName: !certification.certificationName,
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    dispatch(addCertification(certification))
    setCertification({ startDate: "", endDate: "", certificationName: "" })
    setErrors({ startDate: false, endDate: false, certificationName: false })
  }

  const handleRemoveCertification = (index: number) => {
    dispatch(removeCertification(index))
  }

  return (
    <>
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
          error={errors.startDate}
          helperText={errors.startDate ? t("requiredField") : ""}
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
          error={errors.endDate}
          helperText={errors.endDate ? t("requiredField") : ""}
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
          error={errors.certificationName}
          helperText={errors.certificationName ? t("requiredField") : ""}
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
                primary={`${useFormatDate(item.startDate)} - ${useFormatDate(
                  item.endDate
                )} : ${item.certificationName}`}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveCertification(index)}
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

export default CertificationList
