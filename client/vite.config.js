import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          chakra: ["@chakra-ui/react", "@chakra-ui/icons"],
          emotion: ["@emotion/react", "@emotion/styled"],
          chart: ["chart.js"],
          leaflet: ["leaflet", "react-leaflet"],
          other: [
            "axios",
            "luxon",
            "prop-types",
            "react-dotenv",
            "react-paginate",
            "react-router-dom",
            "react-table",
            "recharts",
            "socket.io-client",
          ],
        },
      },
    },
  },
});
