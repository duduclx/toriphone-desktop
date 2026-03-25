import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { Box, Text, HStack, IconButton, Slider } from "@chakra-ui/react";

import { useWazo } from "../../../services/WazoProvider";

const VoicemailGreetingPlayer = ({ type }) => {
  // api
  const { voicemailGreetingGet } = useWazo();

  // resource
  const [fileLink, setFileLink] = useState("");

  // player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
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
    const getUrl = async () => {
      const blob = await voicemailGreetingGet(type);
      const url = window.URL.createObjectURL(blob);
      setFileLink(url);
    };

    getUrl();

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

        <IconButton size="sm" variant="ghost" _hover={{ color: "red.100" }} onClick={() => handleStop()} mr="2">
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
      </HStack>
      <audio ref={audioRef} src={fileLink} />
    </Box>
  );
};

export default VoicemailGreetingPlayer;
