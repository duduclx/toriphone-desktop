import { Button } from "@chakra-ui/react"

const ButtonMenuUi = ({ children, isActive = false, ...props }) => {
  return (
    <Button
    bg={isActive ? "btnMenuActive" : "transparent"}
    _hover={{ bg: "btnMenuHover" }}
    variant="ghost"
    my={1}
    w="100%"
    justifyContent="flex-start"
    {...props}
    >
      {children}
    </Button>
  )
}

export default ButtonMenuUi
