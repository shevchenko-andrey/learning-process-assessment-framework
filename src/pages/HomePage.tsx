import { Center } from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";

const HomePage = () => {
  const { role } = useAuth();
  return (
    <Center flex={1} p={50}>
      <h1>Home Page {role}</h1>
    </Center>
  );
};

export default HomePage;
