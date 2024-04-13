import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Layout;
