import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useAppSelector } from "../hooks/useRedux"
import { useTranslation } from "react-i18next"

type Steps = {
  stepComponent: React.ReactElement<any, any>
  label: string
  optional?: boolean
}

const LinearStepper = (props: { steps: Steps[] }) => {
  const { steps } = props
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())
  const { t } = useTranslation()
  const { enableNextButton } = useAppSelector((state) => state.global)

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!steps[activeStep].optional) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ maxWidth: "1080px", margin: "auto" }}>
      <Stepper activeStep={activeStep} sx={{ paddingBottom: "32px" }}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (step.optional) {
            labelProps.optional = (
              <Typography variant="caption">{t("optional")}</Typography>
            )
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {t("allStepsCompleted")}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>{t("reset")}</Button>
          </Box>
        </>
      ) : (
        <>
          {steps[activeStep].stepComponent}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="contained"
            >
              {t("back")}
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {steps[activeStep].optional && (
              <Button onClick={handleSkip} sx={{ mr: 1 }} variant="contained">
                {t("skip")}
              </Button>
            )}
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={!enableNextButton}
            >
              {activeStep === steps.length - 1 ? t("finish") : t("next")}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default LinearStepper
