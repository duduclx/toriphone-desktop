import { Button } from '@chakra-ui/react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useWazo } from '../../services/WazoProvider';

//

const ToggleSidebar = () => {
  // api
    const { showSidebar, setShowSidebar, setIsFullScreen } = useWazo();

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
        setIsFullScreen(false);
    }

  return (
    <Button
        onClick={() => toggleSidebar()}
        variant="ghost"
        _hover={{backgroundColor:"transparent"}}
        border="2px solid"
        borderColor="btnSdbTgg"
        borderRadius="full"
        p="0"
        justifyContent="center"
        zIndex="2"
      >
        {showSidebar ? <FaAngleLeft /> : <FaAngleRight />}
      </Button>
  )
}

export default ToggleSidebar