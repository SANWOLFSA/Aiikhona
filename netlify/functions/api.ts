// Netlify Function (v2) that serves every /api/* route from the Express app in server.ts.
// GEMINI_API_KEY is injected by Netlify AI Gateway (or set it in Site settings > Environment variables).
import type { Config, Context } from "@netlify/functions";
import serverless from "serverless-http";
import { app } from "../../server";

// serverless-http speaks the Lambda event format, so translate the Request/Response around it.
const lambdaHandler = serverless(app, { binary: true });

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const multiValueQueryStringParameters: Record<string, string[]> = {};
  url.searchParams.forEach((value, key) => {
    (multiValueQueryStringParameters[key] ||= []).push(value);
  });
  const queryStringParameters = Object.fromEntries(
    Object.entries(multiValueQueryStringParameters).map(([k, v]) => [k, v[v.length - 1]]),
  );

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const body = hasBody ? Buffer.from(await req.arrayBuffer()).toString("base64") : null;

  const event = {
    httpMethod: req.method,
    path: url.pathname,
    headers,
    multiValueHeaders: Object.fromEntries(Object.entries(headers).map(([k, v]) => [k, [v]])),
    queryStringParameters,
    multiValueQueryStringParameters,
    body,
    isBase64Encoded: hasBody,
    requestContext: {},
  };

  const result: any = await lambdaHandler(event, {});

  const responseHeaders = new Headers();
  for (const [key, value] of Object.entries(result.headers || {})) {
    if (value !== undefined) responseHeaders.set(key, String(value));
  }
  for (const [key, values] of Object.entries(result.multiValueHeaders || {})) {
    responseHeaders.delete(key);
    for (const value of values as unknown[]) responseHeaders.append(key, String(value));
  }

  const responseBody = result.body
    ? Buffer.from(result.body, result.isBase64Encoded ? "base64" : "utf8")
    : null;
  const noBody = [204, 304].includes(result.statusCode) || req.method === "HEAD";

  return new Response(noBody ? null : responseBody, {
    status: result.statusCode,
    headers: responseHeaders,
  });
};

export const config: Config = {
  path: "/api/*",
};
