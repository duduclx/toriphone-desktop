import { Box, Switch, Table } from "@chakra-ui/react";

import VoicemailPlayer from "./VoicemailPlayer";
import BadgeNotification from "../../../utils/BadgeNotification";

import { useWazo } from "../../../services/WazoProvider";

const VoicemailsTableContent = ({ voicemail, index }) => {
  // api
  const { voicemailFolderUpdate, setVoicemails } = useWazo();

  const voicemailToggleFolder = async () => {
    const folder = voicemail.unread ? "old" : "new";
    const res = await voicemailFolderUpdate(voicemail, folder);
    // Mettre à jour l'état des voicemails
    setVoicemails((prevVoicemails) =>
      prevVoicemails.map((vm) => (vm.id === voicemail.id ? { ...vm, unread: !vm.unread } : vm))
    );
  };

  return (
    <Table.Row key={index} bg="TableBodyBg">
      <Table.Cell position="relative" pl="6">
        {voicemail.caller.name || voicemail.caller.number}
        <Box position="absolute" top="20px" left="24px">
          {voicemail.unread && <BadgeNotification></BadgeNotification>}
        </Box>
      </Table.Cell>
      <Table.Cell>{voicemail.date.toLocaleString()}</Table.Cell>
      <Table.Cell>
        <VoicemailPlayer voicemail={voicemail} />
      </Table.Cell>
      <Table.Cell>
        <Switch.Root checked={!voicemail.unread} onCheckedChange={() => voicemailToggleFolder()} colorPalette="primary">
          <Switch.HiddenInput />
          <Switch.Control bgColor={voicemail.unread ? "red.200" : "blue.200"} />
        </Switch.Root>
      </Table.Cell>
    </Table.Row>
  );
};

export default VoicemailsTableContent;
