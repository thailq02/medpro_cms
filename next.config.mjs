/** @type {import('next').NextConfig} */
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4004",
      },
      {
        protocol: "https",
        hostname: "be.lequangthai-medpro.io.vn",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./global";`,
  },
  reactStrictMode: false,
};

export default nextConfig;
