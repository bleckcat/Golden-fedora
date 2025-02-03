import { useTranslation } from "react-i18next"
import Button from "@mui/material/Button"
import { Box, Grid2, Card, Alert } from "@mui/material"
import { CloudUpload } from "@mui/icons-material"
import VisuallyHiddenInput from "../../styled/VisuallyHiddenInput"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { setPicture } from "../../redux/PersonalInformationSlice"
import PersonalFields from "./form-fragments/PersonalFields"
import { useEffect, useState } from "react"
import { enableStepperNextButton } from "../../redux/GlobalSlice"

const PersonalInformation = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const personalInformation = useAppSelector(
    (state) => state.personalInformation
  )

  const [errors, setErrors] = useState({
    picture: false,
    fullName: false,
    dateOfBirth: false,
    sex: false,
    height: false,
    weight: false,
    manequimSize: false,
  })

  const [touched, setTouched] = useState({
    picture: false,
    fullName: false,
    dateOfBirth: false,
    sex: false,
    height: false,
    weight: false,
    manequimSize: false,
  })

  useEffect(() => {
    const newErrors = {
      picture: !personalInformation.picture && touched.picture,
      fullName: !personalInformation.fullName && touched.fullName,
      dateOfBirth: !personalInformation.dateOfBirth && touched.dateOfBirth,
      sex: !personalInformation.sex && touched.sex,
      height: !personalInformation.height && touched.height,
      weight: !personalInformation.weight && touched.weight,
      manequimSize: !personalInformation.manequimSize && touched.manequimSize,
    }
    setErrors(newErrors)
    const isValid = !Object.values(newErrors).some((error) => error)
    dispatch(enableStepperNextButton(isValid))
  }, [personalInformation, touched, dispatch])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      const imgUrl = URL.createObjectURL(file)
      dispatch(setPicture(imgUrl))
      setErrors((prevErrors) => ({ ...prevErrors, picture: false }))
      setTouched((prevTouched) => ({ ...prevTouched, picture: true }))
    }
  }

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        {errors.picture && (
          <Alert severity="error" sx={{ my: 2 }}>
            {t("pleaseUploadPhoto")}
          </Alert>
        )}
        <Card sx={{ width: 30 * 4, height: 40 * 4, margin: "auto" }}>
          {personalInformation.picture ? (
            <img
              src={personalInformation.picture}
              alt="3x4 picture uploaded by the user"
              width={30 * 4}
              height={40 * 4}
            />
          ) : (
            <Box
              sx={{ bgcolor: "primary.main", height: "100%" }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              fontWeight={"bold"}
            />
          )}
        </Card>
        <Box margin="auto" width="fit-content" pt={2}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            {t("uploadPicture")}
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </Button>
        </Box>
      </Grid2>
      <PersonalFields />
    </Grid2>
  )
}

export default PersonalInformation
