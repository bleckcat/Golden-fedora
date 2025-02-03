import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()

  return <>{t("welcome")}</>
}

export default Home
