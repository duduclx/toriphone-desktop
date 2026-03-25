import { IconButton } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const IconButtonUploadUi = ({...props}) => {
  return (
    <IconButton variant="ghost" colorPalette="primary" {...props}>
      <FaUpload />
    </IconButton>
  )
}

export default IconButtonUploadUi
