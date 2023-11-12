import { Client } from "@gadget-client/chrome-ext";
export const api = new Client({
  authenticationMode: { browserSession: true },
});
