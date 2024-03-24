import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      common: path.resolve(__dirname, "./src/common"),
      components: path.resolve(__dirname, "./src/components"),
      services: path.resolve(__dirname, "./src/services"),
      assets: path.resolve(__dirname, "./src/assets"),
      images: path.resolve(__dirname, "./src/assets/images"),
      icons: path.resolve(__dirname, "./src/assets/icons"),
      stores: path.resolve(__dirname, "./src/stores"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      types: path.resolve(__dirname, "./src/types"),
      utils: path.resolve(__dirname, "./src/utils")
    }
  },
  plugins: [react()]
});
