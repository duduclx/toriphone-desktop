import { IconButton } from "@chakra-ui/react";
import { FaPencilAlt } from "react-icons/fa";

const IconButtonEditUi = ({...props}) => {
  return (
    <IconButton variant="ghost" colorPalette="secondary" {...props} >
      <FaPencilAlt />
    </IconButton>
  )
}

export default IconButtonEditUi
