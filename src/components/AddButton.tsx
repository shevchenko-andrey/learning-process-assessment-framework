import { Center } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Center
      as='button'
      p={6}
      color={"gray.400"}
      borderColor={"gray.400"}
      borderStyle={"dashed"}
      borderRadius={"md"}
      borderWidth={3}
      _hover={{ borderColor: "primary", color: "primary" }}
      onClick={onClick}
    >
      <FaPlus size={30} />
    </Center>
  );
};

export default AddButton;
