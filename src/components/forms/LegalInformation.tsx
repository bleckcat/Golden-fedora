import { useTranslation } from "react-i18next"
import { TextField, MenuItem, Grid2, Alert } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import {
  setMaritalStatus,
  setSpouseName,
  setSpouseBirthDate,
  setChildrenCount,
} from "../../redux/LegalInformationSlice"
import { useEffect, useState } from "react"
import { enableStepperNextButton } from "../../redux/GlobalSlice"

const LegalInformationForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { maritalStatus, spouseName, spouseBirthDate, childrenCount } =
    useAppSelector((state) => state.legalInformation)

  const [errors, setErrors] = useState({
    maritalStatus: false,
    childrenCount: false,
    spouseName: false,
    spouseBirthDate: false,
  })

  useEffect(() => {
    const isValid =
      maritalStatus &&
      childrenCount &&
      (maritalStatus !== "married" || (spouseName && spouseBirthDate))
    dispatch(enableStepperNextButton(isValid))
  }, [maritalStatus, childrenCount, spouseName, spouseBirthDate, dispatch])

  const handleValidation = () => {
    const newErrors = {
      maritalStatus: !maritalStatus,
      childrenCount: !childrenCount,
      spouseName: maritalStatus === "married" && !spouseName,
      spouseBirthDate: maritalStatus === "married" && !spouseBirthDate,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleChange = (field: string, value: string) => {
    switch (field) {
      case "maritalStatus":
        dispatch(setMaritalStatus(value))
        break
      case "childrenCount":
        dispatch(setChildrenCount(value))
        break
      case "spouseName":
        dispatch(setSpouseName(value))
        break
      case "spouseBirthDate":
        dispatch(setSpouseBirthDate(value))
        break
    }
    handleValidation()
  }

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={6}>
        <TextField
          select
          fullWidth
          label={t("maritalStatus")}
          name="maritalStatus"
          value={maritalStatus}
          onChange={(e) => handleChange("maritalStatus", e.target.value)}
          error={errors.maritalStatus}
          helperText={errors.maritalStatus ? t("requiredField") : ""}
        >
          <MenuItem value="single">{t("single")}</MenuItem>
          <MenuItem value="married">{t("married")}</MenuItem>
          <MenuItem value="divorced">{t("divorced")}</MenuItem>
          <MenuItem value="widowed">{t("widowed")}</MenuItem>
        </TextField>
      </Grid2>
      <Grid2 size={6}>
        <TextField
          fullWidth
          label={t("childrenCount")}
          name="childrenCount"
          value={childrenCount}
          onChange={(e) => handleChange("childrenCount", e.target.value)}
          error={errors.childrenCount}
          helperText={errors.childrenCount ? t("requiredField") : ""}
        />
      </Grid2>
      {maritalStatus === "married" && (
        <>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label={t("spouseName")}
              name="spouseName"
              value={spouseName}
              onChange={(e) => handleChange("spouseName", e.target.value)}
              error={errors.spouseName}
              helperText={errors.spouseName ? t("requiredField") : ""}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label={t("spouseBirthDate")}
              name="spouseBirthDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={spouseBirthDate}
              onChange={(e) => handleChange("spouseBirthDate", e.target.value)}
              error={errors.spouseBirthDate}
              helperText={errors.spouseBirthDate ? t("requiredField") : ""}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  )
}

export default LegalInformationForm
