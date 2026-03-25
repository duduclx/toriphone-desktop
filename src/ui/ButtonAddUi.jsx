import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ButtonAddUi = ({ ...props }) => {
  // requirements
  const { t } = useTranslation();

  return (
    <Button colorPalette="primary" {...props}>
      <FaPlus /> {t("common.add")}
    </Button>
  );
};

export default ButtonAddUi;