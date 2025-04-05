import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    allowedHosts: [
      "860b-111-235-226-130.ngrok-free.app",
    ]
  }
});
