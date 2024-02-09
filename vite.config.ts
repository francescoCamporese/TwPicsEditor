import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  includeAssets: ["favicon.ico", "logo192.png", "logo512.png"],
  manifest: {
    name: "TwPicsEditor",
    short_name: "TwPicsEditor",
    icons: [
      {
        src: "favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        src: "logo192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "logo512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
    theme_color: "#000000",
    start_url: ".",
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
