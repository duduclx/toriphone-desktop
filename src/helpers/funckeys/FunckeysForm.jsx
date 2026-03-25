import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import FunckeysType from "./FunckeysType";

import getLabel from "./helper";

import Conference from "./Conference";
import Group from "./Group";
import Queue from "./Queue";

const FunckeysForm = ({ funckey, setFunckey }) => {
  // value
  const [destination, setDestination] = useState(getLabel(funckey?.destination));

  // update funckey
  useEffect(() => {
    setFunckey((prev) => ({
        ...prev,
        destination
    }))
  }, [destination])

  console.log('fk', funckey)

  return (
    <Flex flexDirection="column" gap="4">
      <FunckeysType funckey={funckey} setFunckey={setFunckey} />
      {funckey.destination.type === "conference" && <Conference destination={destination} setDestination={setDestination} />}
      {funckey.destination.type === "group" && <Group destination={destination} setDestination={setDestination} />}
      {funckey.destination.type === "queue" && <Queue destination={destination} setDestination={setDestination} />}
      {funckey.destination.type === "application" && <Text>application</Text>}
    </Flex>
  );
};

export default FunckeysForm;
