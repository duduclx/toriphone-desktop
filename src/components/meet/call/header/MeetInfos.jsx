import { Button, IconButton, HStack, Menu, Portal, Spacer } from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { FaShield, FaRegClock, FaPhone, FaCircleInfo } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import { useAuth } from "toriphone-auth";
import { useWazo } from "../../../../services/WazoProvider";

const MeetInfos = () => {
  // requirements
  const { t } = useTranslation();
  // api
  const { user } = useAuth();
  const { meeting } = useWazo();

  // Copy to clipboard helper
  const copyText = async (value) => {
    await navigator.clipboard.writeText(value);
    toaster.create({
      type: "success",
      description: t("meetings.copy_success"),
      duration: 3000,
      closable: true,
    });
  };

  // copy extension
  const copyExtension = () => {
    copyText(meeting.extension);
  };

  // copy link
  const copyLink = () => {
    const generatedLink = `https://${meeting.uri}/meeting?server=${user.server}&uuid=${meeting.uuid}`;
    copyText(generatedLink);
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton variant="ghost">
          <FaCircleInfo />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <HStack gap="4" width="100%">
              <IconButton variant="ghost" colorPalette={meeting.persistent ? "secondary" : "danger"}>
                <FaRegClock />
              </IconButton>
              <Spacer />
              <Button variant="ghost" onClick={copyExtension}>
                <FaPhone /> {meeting.extension}
              </Button>
            </HStack>
            <HStack gap="4" width="100%">
              <IconButton variant="ghost" colorPalette={meeting.requireAuthorization ? "danger" : "secondary"}>
                <FaShield />
              </IconButton>
              <Spacer />
              <Button variant="ghost" onClick={copyLink}>
                <FaClipboard /> {t("meetings.copy_link")}
              </Button>
            </HStack>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default MeetInfos;
