import { IconButton } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";

const IconButtonDeleteUi = ({...props}) => {
  return (
    <IconButton variant="ghost" colorPalette="danger" {...props}>
      <FaTrashAlt />
    </IconButton>
  )
}

export default IconButtonDeleteUi
