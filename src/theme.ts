import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const breakpoints = {
  base: "20em", // 320px
  sm: "23.4375em", // 375px
  md: "48em", // 768px
  lg: "64em", // 1024px
  xl: "90em" // 1440px
};

const components = {
  Container: defineStyleConfig({
    baseStyle: {
      maxWidth: "90em"
    }
  })
};

const styles = {
  global: {
    "html, body": {
      margin: 0,
      padding: 0
    },
    "ul, ol, li": {
      listStyle: "none"
    }
  }
};

const theme = extendTheme({ config, breakpoints, components, styles });

export default theme;
