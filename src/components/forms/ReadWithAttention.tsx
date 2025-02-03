import { Alert } from "@mui/material"
import { useTranslation } from "react-i18next"

const ReadWithAttention = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Alert severity="info">{t("readWithAttentionAlert")}</Alert>
    </div>
  )
}

export default ReadWithAttention
