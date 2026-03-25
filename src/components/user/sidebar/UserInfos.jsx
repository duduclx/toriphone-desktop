import { Flex, Text } from "@chakra-ui/react";
import { useAuth } from "toriphone-auth";

const UserInfos = () => {
  // api
  const { user } = useAuth();

  return (
    <Flex justifyContent="space-between" width="100%" my="8" p="4" borderRadius="8px" bg="bgElevated">
      <Text>
        {user.profile.firstName} {user.profile.lastName}
      </Text>
      <Text>{user.profile.lines[0].extensions[0].exten}</Text>
    </Flex>
  );
};

export default UserInfos;
