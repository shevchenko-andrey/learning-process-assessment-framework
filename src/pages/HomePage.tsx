import { Button } from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";

const HomePage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <Button colorScheme='blue' onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
