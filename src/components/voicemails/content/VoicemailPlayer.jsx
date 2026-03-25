import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, HStack, IconButton, Slider, Text } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import { FaPlay, FaPause, FaStop, FaTimes } from "react-icons/fa";

import { useWazo } from "../../../services/WazoProvider";

const VoicemailPlayer = ({ voicemail }) => {
  // requirements
  const { t } = useTranslation();

  // api
  const { voicemails, setVoicemails, voicemailFolderUpdate, voicemailDelete, setVoicemailsUnread } = useWazo();

  // states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleDelete = () => {
    voicemailDelete(voicemail.id);
    if (voicemail.unread) {
      setVoicemailsUnread((prevUnread) => prevUnread - 1);
    }
    toaster.create({
      type: "success",
      title: t("voicemails.event_delete"),
      description: "",
      duration: 5000,
      closable: true,
    });
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
    // update unread status
    const index = voicemails.findIndex((item) => item.id === voicemail.id);
    const updatedVoicemails = [...voicemails];
    updatedVoicemails[index] = {
      ...updatedVoicemails[index],
      unread: false,
    };
    setVoicemails(updatedVoicemails);
    // use folder
    voicemailFolderUpdate(voicemail, "old");
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleStop = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const handleSeek = (val) => {
    audioRef.current.currentTime = val / 10;
    setCurrentTime(val);
  };

  function formatDuration(durationSeconds) {
    durationSeconds = Math.ceil(durationSeconds / 10);
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    if (audioRef.current) {
      const loadedMetadataHandler = () => {
        setDuration(Math.ceil(audioRef.current.duration * 10));
      };

      const timeUpdateHandler = () => {
        setCurrentTime(Math.ceil(audioRef.current.currentTime * 10));
      };

      const endedHandler = () => {
        setCurrentTime(0);
        setIsPlaying(false);
      };

      audioRef.current.addEventListener("loadedmetadata", loadedMetadataHandler);
      audioRef.current.addEventListener("timeupdate", timeUpdateHandler);
      audioRef.current.addEventListener("ended", endedHandler);
    }
  }, []);

  return (
    <Box bg="bgElevated" borderRadius="8px" p="2">
      <HStack>
        <IconButton size="sm" variant="ghost" _hover={{ color: "blue.100" }} onClick={() => handlePlayPause()}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </IconButton>

        <IconButton size="sm" variant="ghost" _hover={{ color: "red.100" }} onClick={() => handleStop()} mr={2}>
          <FaStop />
        </IconButton>

        <Slider.Root
          width="100%"
          colorPalette="primary"
          min={0}
          max={duration || 0}
          value={[currentTime]}
          onChange={(val) => handleSeek(val)}
        >
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
          </Slider.Control>
        </Slider.Root>

        <HStack>
          <Text>{formatDuration(currentTime)}</Text>
          <Text> / </Text>
          <Text>{formatDuration(duration)}</Text>
        </HStack>

        <IconButton size="xs" colorPalette="danger" onClick={() => handleDelete()}>
          <FaTimes />
        </IconButton>
      </HStack>
      <audio ref={audioRef} src={voicemail.link} />
    </Box>
  );
};

export default VoicemailPlayer;
