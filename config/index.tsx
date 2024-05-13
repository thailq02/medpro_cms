// PATHNAME
const PATHNAME = {
  HOME: "/",
  LOGIN: "/login",
};

const STORE_NAME = "state";

const NETWORK_CONFIG = {
  HOST: process.env.NEXT_PUBLIC_APP_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_APP_URL,
  BASE_URL: process.env.NEXT_PUBLIC_WEB_URL,
  TIMEOUT: 30000,
  RETRY: false,
  DISPLAY_ERROR: process.env.NEXT_PUBLIC_DISPLAY_ERROR === "true",
  USE_TOKEN: true,
  WITH_METADATA: false,
};

// LAYOUT
const LAYOUT_CONFIG = {
  useSidebar: true,
  useNavbar: true,
  useFooter: true,
  useBottomNavigator: true,
  tableHeight: "max(300px, calc(100vh - 260px))",
  tableWidth: "800px",
};

export default {
  PATHNAME,
  STORE_NAME,
  NETWORK_CONFIG,
  LAYOUT_CONFIG,
};
