// Netlify Function that serves every /api/* route from the Express app in server.ts.
// The Gemini key stays server-side: set GEMINI_API_KEY in Netlify > Site settings > Environment variables.
import serverless from "serverless-http";
import { app } from "../../server";

export const handler = serverless(app);
