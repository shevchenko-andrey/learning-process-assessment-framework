import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "white",
  useSystemColorMode: false
};

const breakpoints = {
  base: "20em", // 320px
  sm: "23.4375em", // 375px
  md: "48em", // 768px
  lg: "64em", // 1024px
  xl: "90em" // 1440px
};

export const colors = {
  primary: "#66bf72"
};

const components = {
  Container: defineStyleConfig({
    baseStyle: {
      maxWidth: "90em"
    }
  }),
  Card: defineStyleConfig({
    baseStyle: {
      p: 2,
      border: "1px solid #cad1da",
      borderRadius: 8,
      shadow: "md",
      gap: 2
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

const theme = extendTheme({
  config,
  breakpoints,
  components,
  styles,
  colors
});

export default theme;
