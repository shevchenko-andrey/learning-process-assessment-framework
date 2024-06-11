import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import logo from "assets/logo.svg";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import AnimatedMenu from "./AnimatedMenu";
import MainMenu from "./MainMenu";

const MotionBox = motion(Box);

const Layout = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex minH={"100vh"} direction={"column"}>
      <Center zIndex={20} p={5}>
        <Flex w={"100%"} justify={"space-between"} align={"center"} gap={5}>
          <Flex align={"center"} gap={5}>
            <Image width={10} src={logo} alt='logo' />
            <Text
              as={"p"}
              lineHeight={1}
              fontWeight={600}
              fontSize={{ base: "xl", sm: "3xl" }}
            >
              Quick test
            </Text>
          </Flex>

          <Box p={2} as={"button"} onClick={onToggle}>
            <AnimatedMenu isOpen={isOpen} />
          </Box>
        </Flex>
      </Center>

      {isOpen && (
        <MotionBox
          w={"100%"}
          h={"100vh"}
          bg={"white"}
          zIndex={10}
          position={"absolute"}
          initial={{ y: "-20vh" }}
          animate={{ y: 0 }}
          transition={{ ease: "circInOut" }}
        >
          <Center flexDirection={"column"} gap={10} pt={40} pb={20}>
            <MainMenu onClose={onToggle} />
          </Center>
        </MotionBox>
      )}

      <Container display={"flex"} flex={1} h={"100%"}>
        <Outlet />
      </Container>
    </Flex>
  );
};

export default Layout;
