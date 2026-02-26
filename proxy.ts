import { NextResponse } from "next/server";

function buildCsp() {
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSources = ["'self'", "'unsafe-inline'"];
  if (isDev) {
    scriptSources.push("'unsafe-eval'");
  }

  const styleSources = ["'self'", "'unsafe-inline'"];

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "frame-src 'self' https://meet.jit.si https://*.daily.co https://www.youtube.com https://player.vimeo.com",
    "form-action 'self'",
    "object-src 'none'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "font-src 'self' data:",
    `style-src ${styleSources.join(" ")}`,
    `script-src ${scriptSources.join(" ")}`,
    "connect-src 'self' https://*.supabase.co https://*.upstash.io https://www.googleapis.com",
  ].join("; ");
}

export function proxy() {
  const response = NextResponse.next();
  const csp = buildCsp();

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Content-Security-Policy-Report-Only", csp);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
