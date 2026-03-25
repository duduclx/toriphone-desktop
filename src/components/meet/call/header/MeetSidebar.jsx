import { IconButton, Float } from "@chakra-ui/react";
import { FaCommentAlt, FaUsers } from "react-icons/fa";

import { useWazo } from "../../../../services/WazoProvider";

const MeetSidebar = () => {
  // api
  const { meeting, meetingRoom, meetingSidebarContent, setMeetingSidebarContent } = useWazo();
  return (
    <>
      {/*
        to send signal
        <IconButton variant="ghost">
          <MdPanTool />
        </IconButton>
        */}
      <IconButton
        variant="ghost"
        colorPalette={meetingSidebarContent === "chat" ? "secondary" : "default"}
        onClick={() => {
          meetingSidebarContent === "chat" ? setMeetingSidebarContent("none") : setMeetingSidebarContent("chat");
        }}
      >
        <FaCommentAlt />
      </IconButton>
      <IconButton
        variant="ghost"
        colorPalette={meetingSidebarContent === "participants" ? "secondary" : "default"}
        onClick={() => {
          meetingSidebarContent === "participants"
            ? setMeetingSidebarContent("none")
            : setMeetingSidebarContent("participants");
        }}
      >
        <FaUsers />
        <Float placement="bottom" offsetX="0" offsetY="-2">
          {meetingRoom.participants.length}
        </Float>

        {meeting.pendingAuthorizations && meeting.pendingAuthorizations.length > 0 && (
          <Float color={"red.300"}>1</Float>
        )}
      </IconButton>
    </>
  );
};

export default MeetSidebar;
