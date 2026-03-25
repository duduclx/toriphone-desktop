import { useState, useRef, useEffect } from "react";
import { HStack, IconButton } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

const RingtonePlayer = ({ ringtone, ringVolume, ringDevice }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.volume = ringVolume / 100;
    audioRef.current.setSinkId(ringDevice)
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
      audioRef.current.volume = ringVolume / 100;
      const endedHandler = () => {
        setIsPlaying(false);
      };

      audioRef.current.addEventListener("ended", endedHandler);
    }
  }, [ringVolume]);

  useEffect(() => {
    if(isPlaying) {
      //handleStop()
      handlePlay()
    }
  }, [ringtone, ringDevice])

  return (
    <>
      <HStack>
        <IconButton
          size="sm"
          variant="ghost"
          _hover={{ color: "blue.100" }}
          onClick={() => handlePlayPause()}
        >{isPlaying ? <FaPause /> : <FaPlay />}</IconButton>

        <IconButton
          size="sm"
          variant="ghost"
          _hover={{ color: "red.100" }}
          onClick={() => handleStop()}
          mr="2"
        ><FaStop /></IconButton>
      </HStack>
      <audio ref={audioRef} src={ringtone} />
    </>
  );
};

export default RingtonePlayer;
