import SelectCvType from "../components/forms/SelectCvType";
import LinearStepper from "../components/Stepper";
import JobTypeForm from "../components/forms/JobTypeForm";
import { useTranslation } from "react-i18next";
import PersonalInformation from "../components/forms/PersonalInformation";
import LegalInformation from "../components/forms/LegalInformation";
import EducationWork from "../components/forms/EducationWork";
import { Box } from "@mui/material";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Box maxWidth={600} margin="auto">
      <LinearStepper
        steps={[
          { label: t("readWithAttention"), stepComponent: <SelectCvType /> },
          { label: t("jobType"), stepComponent: <JobTypeForm /> },
          { label: t("personalInformation"), stepComponent: <PersonalInformation /> },
          { label: t("legalInformation"), stepComponent: <LegalInformation /> },
          { label: t("educationWork"), stepComponent: <EducationWork /> },
        ]}
      />
    </Box>
  );
};

export default Home;