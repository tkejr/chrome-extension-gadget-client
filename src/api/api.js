import { Client } from "@gadget-client/chrome-ext";
export const api = new Client({
  authenticationMode: { browserSession: true },
});

// Fetch the app name using the Graphql API
// api
//   .query(
//     `
//   query GetAppName {
//     gadgetMeta {
//       slug
//     }
//   }
// `
//   )
//   .then((response) => {
//     if (response?.gadgetMeta?.slug) {
//       setAppName(response.gadgetMeta.slug);
//     }
//   })
//   .catch((error) => {
//     console.error("Error fetching app name:", error);
//   });
