import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path"; // Certifique-se de importar 'resolve'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/styles/globalStyle.scss";
          @import "src/styles/_variables.scss";
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      src: resolve(__dirname, "src"),
    },
  },
});
