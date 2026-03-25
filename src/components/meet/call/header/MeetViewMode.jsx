import { IconButton, Menu, Portal, Text } from "@chakra-ui/react";
import { MdScreenShare, MdGridView, MdViewSidebar, MdFullscreen, MdFaceRetouchingOff } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useWazo } from "../../../../services/WazoProvider";

const MeetViewMode = () => {
  // requirements
  const { t } = useTranslation();

  // api
  const { meetingViewMode, setMeetingViewMode, meetingHideMe, setMeetingHideMe } = useWazo();

  return (
    <Menu.Root size="md">
      <Menu.Trigger asChild>
        <IconButton variant="ghost">
          {meetingViewMode === "gallery" && <MdGridView />}
          {meetingViewMode === "side" && <MdViewSidebar />}
          {meetingViewMode === "presentation" && <MdScreenShare />}
          {meetingViewMode === "fullscreen" && <MdFullscreen />}
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              value="gallery"
              onClick={() => setMeetingViewMode("gallery")}
              color={meetingViewMode === "gallery" ? "green.200" : "inherit"}
            >
              <MdGridView />
              <Text>{t("meetings.gallery")}</Text>
            </Menu.Item>
            <Menu.Item
              value="side"
              onClick={() => setMeetingViewMode("side")}
              color={meetingViewMode === "side" ? "green.200" : "inherit"}
            >
              <MdViewSidebar />
              <Text>{t("meetings.sidebar")}</Text>
            </Menu.Item>
            <Menu.Item
              value="presentation"
              onClick={() => setMeetingViewMode("presentation")}
              color={meetingViewMode === "presentation" ? "green.200" : "inherit"}
            >
              <MdScreenShare />
              <Text>{t("meetings.presentation")}</Text>
            </Menu.Item>
            {/*
            <Menu.Item
              value="fullscreen"
              onClick={() => setMeetingViewMode("fullscreen")}
              color={meetingViewMode === "fullscreen" ? "green.200" : "inherit"}
            >
              <MdFullscreen />
              <Text>{t("meetings.fullscreen")}</Text>
            </Menu.Item>
            */}
            <Menu.Separator />
            <Menu.Item value="hide" onClick={() => setMeetingHideMe(!meetingHideMe)} color={meetingHideMe ? "green.200" : "inherit"}>
              <MdFaceRetouchingOff />
              <Text>{t("meetings.hide_me")}</Text>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default MeetViewMode;
