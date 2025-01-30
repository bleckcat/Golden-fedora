import SelectCvType from "../components/forms/SelectCvType";
import LinearStepper from "../components/Stepper";
import JobTypeForm from "../components/forms/JobTypeForm";
import { useTranslation } from "react-i18next";
import PersonalInformation from "../components/forms/PersonalInformation";
import { Box } from "@mui/material";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Box maxWidth={600} margin="auto">
      <LinearStepper
        steps={[
          { label: t("readWithAttention"), stepComponent: <SelectCvType /> },
          { label: t("jobType"), stepComponent: <JobTypeForm /> },
          {
            label: t("personalInformation"),
            stepComponent: <PersonalInformation />,
          },
        ]}
      />
    </Box>
  );
};

export default Home;
