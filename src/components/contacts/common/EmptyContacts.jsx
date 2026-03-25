import { Flex, Text } from "@chakra-ui/react";

const EmptyContacts = ({ text, sub }) => {

  return (
    <Flex flex="1" justifyContent="center" alignItems="center">
      <Flex flexDirection="column" gap="4" justifyContent="center" bg="bgSecondary" borderRadius="8px" p="4" textAlign="center" width="50%" height="50%">
        <Text>{text}</Text>
        <Text as="sub">{sub}</Text>
      </Flex>
    </Flex>
  );
};

export default EmptyContacts;
