import { Flex, Heading, Text } from "@chakra-ui/react";
import LoginForm from "components/LoginForm";
import { useAuth } from "hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import { User } from "types/User";

const LoginPage = () => {
  const { isLogin, login } = useAuth();
  const handleSubmit = (user: Omit<User, "token" | "id">) => {
    login({ ...user, id: "1", token: "token" });
  };

  return (
    <Flex
      h={"100vh"}
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      gap={10}
    >
      <Heading>Login</Heading>
      <LoginForm handleSubmit={handleSubmit}>
        <Link to='/register'>
          <Text color={"#1280b3"}>Don't have an account? Sign up here</Text>
        </Link>
      </LoginForm>
      <Navigate to={isLogin ? "/home" : "/login"} replace />
    </Flex>
  );
};
export default LoginPage;
