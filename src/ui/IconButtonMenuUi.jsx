import { IconButton } from "@chakra-ui/react";
import { FaEllipsisH } from "react-icons/fa";

const IconButtonMenuUi = ({...props}) => {
  return (
    <IconButton size="sm" variant="ghost" colorPalette="primary" {...props} >
      <FaEllipsisH />
    </IconButton>
  )
}

export default IconButtonMenuUi
