import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const ADMIN_PATHS = [
  "/admin",
  ...routing.locales.map((locale) => `/${locale}/admin`),
];

function isAdminPath(pathname: string): boolean {
  return ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;

  try {
    const [, base64] = auth.split(" ");
    const [, password] = atob(base64).split(":");
    return password === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export default function proxy(req: NextRequest) {
  if (isAdminPath(req.nextUrl.pathname) && !isAuthorized(req)) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
