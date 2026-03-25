import { Checkbox } from "@chakra-ui/react";

const CheckboxUi = ({ children, ...props }) => {
  return (
    <Checkbox.Root colorPalette="cyan" {...props}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>{children}</Checkbox.Label>
    </Checkbox.Root>
  );
};

export default CheckboxUi;
