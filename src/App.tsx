import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import router from "./router";
import theme from "./common/theme";

const App = () => {
  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

export default App;
