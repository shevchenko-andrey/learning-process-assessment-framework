import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface MenuItemProps {
  children: ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ children }) => {
  return (
    <Text fontWeight={500} fontSize={"x-large"} display={"block"}>
      {children}
    </Text>
  );
};

export default MenuItem;
