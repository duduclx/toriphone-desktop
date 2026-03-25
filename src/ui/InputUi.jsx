import { Input } from "@chakra-ui/react";

const InputUi = ({ ...props }) => {
  return <Input size="lg" bg="selectBg" borderColor="selectBorder" {...props} />;
};

export default InputUi;
