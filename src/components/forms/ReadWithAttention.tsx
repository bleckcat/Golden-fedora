import { Alert } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useAppDispatch } from "../../hooks/useRedux"
import { useEffect } from "react"
import { enableStepperNextButton } from "../../redux/GlobalSlice"

const ReadWithAttention = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(enableStepperNextButton(true))
  }, [])
  
  return (
    <div>
      <Alert severity="info">{t("readWithAttentionAlert")}</Alert>
    </div>
  )
}

export default ReadWithAttention
