import {
  Flex,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size='md'>
      <Input
        {...props}
        ref={ref}
        pr='4.5rem'
        type={show ? "text" : "password"}
      />
      <InputRightElement>
        <Flex
          align={"center"}
          justify={"center"}
          pr={2}
          pt={2}
          as={"button"}
          type={"button"}
          onClick={handleClick}
        >
          {show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
        </Flex>
      </InputRightElement>
    </InputGroup>
  );
});

export default PasswordInput;
