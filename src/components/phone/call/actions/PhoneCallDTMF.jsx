import { useState } from "react";
import { CloseButton, Flex, HStack, IconButton, InputGroup, Popover } from "@chakra-ui/react";
import { ButtonDialUi, InputUi } from "../../../../ui";
import { FaTty } from "react-icons/fa";

import {
  TbSquareRoundedNumber0Filled,
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
  TbSquareRoundedNumber5Filled,
  TbSquareRoundedNumber6Filled,
  TbSquareRoundedNumber7Filled,
  TbSquareRoundedNumber8Filled,
  TbSquareRoundedNumber9Filled,
  TbAsterisk,
  TbHash,
} from "react-icons/tb";

import { useWazo } from "../../../../services/WazoProvider";

const PhoneCallDTMF = ({ round = false }) => {
  // api
  const { sendDTMF, callSession } = useWazo();

  // states
  const [dtmf, setdtmf] = useState("");

  const handleDtmf = (tone) => {
    setdtmf((prevDtmf) => prevDtmf + tone);
    sendDTMF(tone, callSession);
  };

  const onSendDTMF = () => {
    sendDTMF(dtmf, callSession);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {round ? (
          <IconButton rounded="100%" size="lg" colorPalette="secondary">
            <FaTty />
          </IconButton>
        ) : (
          <IconButton variant="ghost" colorPalette="white">
            <FaTty />
          </IconButton>
        )}
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content bg="bgDefault" w="240px">
          <Popover.CloseTrigger />
          <Popover.Body>
            <Flex direction="column" gap="2" w="full">
              <HStack mt="6">
                <InputGroup endElement={<CloseButton onClick={() => setdtmf("")} me="-2" />}>
                  <InputUi readOnly value={dtmf} />
                </InputGroup>
              </HStack>
              <HStack justifyContent="center" w="full">
                <ButtonDialUi onClick={() => handleDtmf("1")}>
                  <TbSquareRoundedNumber1Filled />
                </ButtonDialUi>
                <ButtonDialUi onClick={() => handleDtmf("2")}>
                  <TbSquareRoundedNumber2Filled />
                </ButtonDialUi>
                <ButtonDialUi onClick={() => handleDtmf("3")}>
                  <TbSquareRoundedNumber3Filled />
                </ButtonDialUi>
              </HStack>
              <HStack justifyContent="center">
                <ButtonDialUi onClick={() => handleDtmf("4")}>
                  <TbSquareRoundedNumber4Filled />
                </ButtonDialUi>
                <ButtonDialUi onClick={() => handleDtmf("5")}>
                  <TbSquareRoundedNumber5Filled />
                </ButtonDialUi>
                <ButtonDialUi onClick={() => handleDtmf("6")}>
                  <TbSquareRoundedNumber6Filled />
                </ButtonDialUi>
              </HStack>
              <HStack justifyContent="center">
                <ButtonDialUi onClick={() => handleDtmf("7")}>
                  <TbSquareRoundedNumber7Filled  />
                </ButtonDialUi>
                <ButtonDialUi onClick={() => handleDtmf("8")}>
                  <TbSquareRoundedNumber8Filled />
                </ButtonDialUi>
                <ButtonDialUi onClick={() => handleDtmf("9")}>
                  <TbSquareRoundedNumber9Filled />
                </ButtonDialUi>
              </HStack>
              <HStack justifyContent="center">
                <ButtonDialUi onClick={() => handleDtmf("*")}>
                  <TbAsterisk />
                </ButtonDialUi>
                <ButtonDialUi onClick={() => handleDtmf("0")}>
                  <TbSquareRoundedNumber0Filled />
                </ButtonDialUi>
                <ButtonDialUi onClick={() => handleDtmf("#")}>
                  <TbHash />
                </ButtonDialUi>
              </HStack>
            </Flex>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default PhoneCallDTMF;
