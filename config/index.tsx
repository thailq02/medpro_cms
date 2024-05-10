// PATHNAME
const PATHNAME = {
  HOME: "/",
  LOGIN: "/login",
};

const STORE_NAME = "state";

const NETWORK_CONFIG = {
  HOST: process.env.NEXT_PUBLIC_APP_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_APP_URL + "/api",
  BASE_URL: process.env.NEXT_PUBLIC_WEB_URL,
  TIMEOUT: 30000,
  RETRY: false,
  DISPLAY_ERROR: process.env.NEXT_PUBLIC_DISPLAY_ERROR === "true",
  USE_TOKEN: true,
  WITH_METADATA: false,
};

export default {
  PATHNAME,
  STORE_NAME,
  NETWORK_CONFIG,
};
