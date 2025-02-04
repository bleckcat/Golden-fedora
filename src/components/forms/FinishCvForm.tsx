import Button from "@mui/material/Button"
import axios from "axios"
import { useAppSelector } from "../../hooks/useRedux"

const FinishCvForm = () => {
  const personalInformation = useAppSelector(
    (state) => state.personalInformation
  )
  const legalInformation = useAppSelector((state) => state.legalInformation)
  const educationWork = useAppSelector((state) => state.educationWork)
  const jobType = useAppSelector((state) => state.jobType.jobType)

  const handleDownload = async (language: string) => {
    try {
      const params = {
        ...personalInformation,
        ...legalInformation,
        ...educationWork,
        jobType,
        language,
      }

      const response = await axios.get(
        `http://localhost:3000/cv/create-${language}-cv`,
        {
          params,
          responseType: "blob",
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `Curriculo_${language}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error("Error downloading the CV:", error)
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDownload("jp")}
      >
        Download CV in Japanese
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDownload("pt")}
      >
        Download CV in Portuguese
      </Button>
    </div>
  )
}

export default FinishCvForm
