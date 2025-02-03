import { useTranslation } from "react-i18next"
import { TextField, MenuItem, Grid2 } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import {
  setMaritalStatus,
  setSpouseName,
  setSpouseBirthDate,
  setChildrenCount,
} from "../../redux/LegalInformationSlice"

const LegalInformationForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { maritalStatus, spouseName, spouseBirthDate, childrenCount } =
    useAppSelector((state) => state.legalInformation)

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={6}>
        <TextField
          select
          fullWidth
          label={t("maritalStatus")}
          name="maritalStatus"
          value={maritalStatus}
          onChange={(e) => dispatch(setMaritalStatus(e.target.value))}
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
          onChange={(e) => dispatch(setChildrenCount(e.target.value))}
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
              onChange={(e) => dispatch(setSpouseName(e.target.value))}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label={t("spouseBirthDate")}
              name="spouseBirthDate"
              type="date"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              value={spouseBirthDate}
              onChange={(e) => dispatch(setSpouseBirthDate(e.target.value))}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  )
}

export default LegalInformationForm
