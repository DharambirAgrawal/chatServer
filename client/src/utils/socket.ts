import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.VITE_ENV === "production"
    ? undefined
    : "http://localhost:3000";

// loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

export const socket = io(URL, {
  autoConnect: false,
});
