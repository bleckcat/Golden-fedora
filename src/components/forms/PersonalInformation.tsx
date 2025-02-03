import { useTranslation } from "react-i18next"
import Button from "@mui/material/Button"
import { Box, Grid2, Card } from "@mui/material"
import { CloudUpload } from "@mui/icons-material"
import VisuallyHiddenInput from "../../styled/VisuallyHiddenInput"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { setPicture } from "../../redux/PersonalInformationSlice"
import PersonalFields from "./form-fragments/PersonalFields"

const PersonalInformation = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const personalInformation = useAppSelector(
    (state) => state.personalInformation
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      const imgUrl = URL.createObjectURL(file)
      dispatch(setPicture(imgUrl))
    }
  }

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
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
