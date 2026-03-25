import { useState, useRef, useEffect } from "react";
import { HStack, IconButton } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

const AudioPlayer = ({ audioVolume, audioDevice }) => {
  const sample = "./sounds/AudioSampleBird.mp3";

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.volume = audioVolume / 100;
    audioRef.current.setSinkId(audioDevice);
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
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume / 100;
      const endedHandler = () => {
        setIsPlaying(false);
      };

      audioRef.current.addEventListener("ended", endedHandler);
    }
  }, [audioVolume]);

  useEffect(() => {
    if (isPlaying) {
      //handleStop()
      handlePlay();
    }
  }, [audioDevice]);

  return (
    <>
      <HStack>
        <IconButton size="sm" variant="ghost" _hover={{ color: "blue.100" }} onClick={() => handlePlayPause()}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </IconButton>

        <IconButton size="sm" variant="ghost" _hover={{ color: "red.100" }} onClick={() => handleStop()} mr="2">
          <FaStop />
        </IconButton>
      </HStack>
      <audio ref={audioRef} src={sample} />
    </>
  );
};

export default AudioPlayer;
