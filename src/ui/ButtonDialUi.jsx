import { Button } from "@chakra-ui/react";

const ButtonDialUi = ({ children, ...props }) => {
  return (
    <Button
      variant="ghost"
      w="48px"
      h="48px"
      css={{
        _icon: {
          width: "40px",
          height: "40px",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonDialUi;
