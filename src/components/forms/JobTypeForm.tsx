import React from "react";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const JobTypeForm = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState("arubaito");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{t("jobType")}</FormLabel>
      <RadioGroup
        aria-label="jobType"
        name="jobType"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="arubaito"
          control={<Radio />}
          label={t("findArubaito")}
        />
        <FormControlLabel
          value="fullTime"
          control={<Radio />}
          label={t("findFullTime")}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default JobTypeForm;
