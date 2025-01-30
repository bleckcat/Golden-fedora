import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <div>
      <LanguageSwitcher />
      <h1>{t("welcome")}</h1>
    </div>
  );
};

export default Navbar;
