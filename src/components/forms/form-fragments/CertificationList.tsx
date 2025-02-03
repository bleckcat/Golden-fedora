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
import { addCertification, removeCertification } from "../../../redux/EducationWorkSlice"

const CertificationList = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { certifications } = useAppSelector((state) => state.educationWork)

  const [certification, setCertification] = useState({
    startDate: "",
    endDate: "",
    certificationName: "",
  })

  const handleAddCertification = () => {
    dispatch(addCertification(certification))
    setCertification({ startDate: "", endDate: "", certificationName: "" })
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
