import { Alert, Box, IconButton } from "@chakra-ui/react";
import { FaXmark } from "react-icons/fa6";

const Errors = ({ errors, setErrors }) => {
  return errors ? (
    <>
      {errors && (
        <Alert.Root status="error" borderRadius="4px">
          <Alert.Indicator />
          <Box width="100%">
            <Alert.Title>{errors.title}</Alert.Title>
            <Alert.Description>{errors.description}</Alert.Description>
          </Box>
          <IconButton variant="ghost" onClick={() => setErrors(null)}>
            <FaXmark />
          </IconButton>
        </Alert.Root>
      )}
    </>
  ) : null;
};

export default Errors;
