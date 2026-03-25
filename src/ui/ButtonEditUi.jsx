import { Button } from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ButtonEditUi = ({...props}) => {
    // requirements
    const { t } = useTranslation();

  return (
    <Button colorPalette="secondary" {...props}>
        <FaPen /> {t("common.edit")}
    </Button>
  )
}

export default ButtonEditUi
