import { createClient } from "microcms-js-sdk"; //ES6

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: "qinsalon-blog-study", // YOUR_DOMAIN is the XXXX part of XXXX.microcms.io
  apiKey: process.env.API_KEY,
  // retry: true // Retry attempts up to a maximum of two times.
});
