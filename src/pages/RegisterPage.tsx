import { Flex, Heading, Text } from "@chakra-ui/react";
import LoginForm from "components/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { UserCredentials } from "types/User";

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (credentials: UserCredentials) => {
    try {
      await AuthService.register(credentials);
    } catch (error) {
      console.error(error);
    }
    navigate("/login");
  };

  return (
    <Flex
      h={"100vh"}
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      gap={10}
    >
      <Heading>Register</Heading>
      <LoginForm handleSubmit={handleSubmit}>
        <Link to='/login'>
          <Text color={"#1280b3"}>Already have an account? Sign in here</Text>
        </Link>
      </LoginForm>
    </Flex>
  );
};
export default RegisterPage;
