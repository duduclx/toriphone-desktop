import { ButtonMenuUi } from "../../../ui";
import { useColorModeValue, useColorMode } from "../../ui/color-mode";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const UserTheme = () => {
  const { t } = useTranslation();
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);

  return (
    <ButtonMenuUi onClick={() => toggleColorMode()}>
      <SwitchIcon /> {t("user.theme")}
    </ButtonMenuUi>
  );
};

export default UserTheme;
