import LinearStepper from "../components/Stepper"
import JobTypeForm from "../components/forms/JobTypeForm"
import { useTranslation } from "react-i18next"
import ReadWithAttention from "../components/forms/ReadWithAttention"
import PersonalInformation from "../components/forms/PersonalInformation"
import LegalInformation from "../components/forms/LegalInformation"
import EducationWork from "../components/forms/EducationWork"
import { Box, Card } from "@mui/material"
import {
  DegradeBackgroundOverlay,
  ManuelCosentinoBackground,
} from "../styled/BackgroundContainers"
import FinishCvForm from "../components/forms/FinishCvForm"

const CreateCv = () => {
  const { t } = useTranslation()

  return (
    <ManuelCosentinoBackground>
      <Box maxWidth={760} margin="auto" my={4} zIndex={1}>
        <Card elevation={2}>
          <Box p={2}>
            <LinearStepper
              steps={[
                {
                  label: t("readWithAttention"),
                  stepComponent: <FinishCvForm />,
                },
                { label: t("jobType"), stepComponent: <JobTypeForm /> },
                {
                  label: t("personalInformation"),
                  stepComponent: <PersonalInformation />,
                },
                {
                  label: t("legalInformation"),
                  stepComponent: <LegalInformation />,
                },
                { label: t("educationWork"), stepComponent: <EducationWork /> },
                { label: "CU", stepComponent: <FinishCvForm /> },
              ]}
            />
          </Box>
        </Card>
      </Box>
      <DegradeBackgroundOverlay />
    </ManuelCosentinoBackground>
  )
}

export default CreateCv
