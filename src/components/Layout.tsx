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
    <Flex minH={"100vh"} direction={"column"} justify={"space-between"}>
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

      <Box position={"relative"} flex={1}>
        {isOpen && (
          <MotionBox
            w={"100%"}
            minH={"100vh"}
            bg={"white"}
            zIndex={10}
            position={"absolute"}
            initial={{ y: "-20vh" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <Center flexDirection={"column"} gap={10} py={20}>
              <MainMenu onClose={onToggle} />
            </Center>
          </MotionBox>
        )}

        <Container>
          <Box flex={1}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Flex>
  );
};

export default Layout;
