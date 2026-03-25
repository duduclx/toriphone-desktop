import { Button } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ButtonDeleteUi = ({...props}) => {
    // requirements
    const { t } = useTranslation();

  return (
    <Button colorPalette="danger" {...props}>
        <FaTrashAlt /> {t("common.delete")}
    </Button>
  )
}

export default ButtonDeleteUi
