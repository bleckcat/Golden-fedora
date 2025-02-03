import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { setJobType } from "../../redux/JobTypeSlice"
import { enableStepperNextButton } from "../../redux/GlobalSlice"

const JobTypeForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const jobType = useAppSelector((state) => state.jobType.jobType)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setJobType((event.target as HTMLInputElement).value))
  }

  useEffect(() => {
    dispatch(enableStepperNextButton(true))
  }, [])

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{t("jobType")}</FormLabel>
      <RadioGroup
        aria-label="jobType"
        name="jobType"
        value={jobType}
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
  )
}

export default JobTypeForm
