import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import ParticipantCard from "./ParticipantCard";

const PAGE_SIZE = 16;

const getGrid = (count) => {
  if (count <= 1) return { cols: 1, rows: 1 };
  if (count <= 2) return { cols: 2, rows: 1 };
  if (count <= 4) return { cols: 2, rows: 2 };
  if (count <= 6) return { cols: 3, rows: 2 };
  if (count <= 9) return { cols: 3, rows: 3 };
  if (count <= 12) return { cols: 4, rows: 3 };
  return { cols: 4, rows: 4 };
};

const VideoGrid = ({ participants }) => {

  const [page, setPage] = useState(0);

  const visibleParticipants =
    participants.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const count = visibleParticipants.length;

  const { cols, rows } = getGrid(count);

  const width = `${100 / cols}%`;
  const height = `${100 / rows}%`;

  return (
    <Flex
      flex="1"
      wrap="wrap"
      width="100%"
      height="100%"
    >
      {visibleParticipants.map((p) => (
        <Box
          key={p.callId}
          width={width}
          height={height}
          p="2"
        >
          <ParticipantCard participant={p} />
        </Box>
      ))}
    </Flex>
  );
};

export default VideoGrid;