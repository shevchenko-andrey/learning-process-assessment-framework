import { Box, forwardRef } from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";

interface ThreeDotsMenuProps {
  onClickMenu?: () => void;
  size?: number;
}

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = forwardRef(
  ({ onClickMenu, size = 20 }, ref) => {
    return (
      <Box
        ref={ref}
        p={2}
        _hover={{ bg: "#e7e7e7", opacity: 0.6 }}
        borderRadius={"100%"}
        onClick={onClickMenu}
      >
        <HiDotsVertical size={size} />
      </Box>
    );
  }
);

export default ThreeDotsMenu;
