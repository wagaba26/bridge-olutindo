import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function buildCsp({
  nonce,
  allowInlineStyle,
}: {
  nonce: string;
  allowInlineStyle: boolean;
}) {
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSources = ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"];
  if (isDev) {
    scriptSources.push("'unsafe-eval'");
  }

  const styleSources = allowInlineStyle ? ["'self'", "'unsafe-inline'"] : ["'self'"];

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "object-src 'none'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "font-src 'self' data:",
    `style-src ${styleSources.join(" ")}`,
    `script-src ${scriptSources.join(" ")}`,
    "connect-src 'self' https://*.supabase.co https://*.upstash.io https://www.googleapis.com",
    "report-uri /api/security/csp-report",
  ].join("; ");
}

export function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const enforcedCsp = buildCsp({ nonce, allowInlineStyle: true });
  const reportOnlyCsp = buildCsp({ nonce, allowInlineStyle: false });

  response.headers.set("Content-Security-Policy", enforcedCsp);
  response.headers.set("Content-Security-Policy-Report-Only", reportOnlyCsp);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

