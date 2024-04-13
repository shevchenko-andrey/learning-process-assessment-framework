import { Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { UserCredentials } from "types/User";
import PasswordInput from "./PasswordInput";

interface LoginFormProps {
  children: ReactNode;
  handleSubmit: (credentials: UserCredentials) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ children, handleSubmit }) => {
  const form = useForm<UserCredentials>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { errors } = form.formState;

  return (
    <Grid
      onSubmit={form.handleSubmit(handleSubmit)}
      as='form'
      row={5}
      column={1}
      gap={8}
    >
      <Flex direction='column' gap={2}>
        <Input
          {...form.register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address"
            }
          })}
          size={"lg"}
          placeholder='Email'
        />
        {errors.email && <Text color={"#e57373"}>{errors.email.message}</Text>}
      </Flex>

      <Flex direction='column' gap={2}>
        <PasswordInput
          size={"lg"}
          placeholder='Password'
          {...form.register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
        />

        {errors.password && (
          <Text color={"#e57373"}>{errors.password.message}</Text>
        )}
      </Flex>

      <Button colorScheme='blue' type='submit'>
        Submit
      </Button>

      {children}
    </Grid>
  );
};

export default LoginForm;
