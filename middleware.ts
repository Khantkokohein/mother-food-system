import { NextRequest, NextResponse } from "next/server";

function hasAdminAccess(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "true";
}

function hasKitchenAccess(req: NextRequest) {
  return (
    req.cookies.get("kitchen_auth")?.value === "true" ||
    req.cookies.get("admin_auth")?.value === "true"
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isKitchenPage = pathname.startsWith("/kitchen");

  const isProtectedApi =
    pathname === "/api/kitchen-orders" ||
    pathname === "/api/order-status";

  const isAdminLoginPage = pathname === "/admin-login";
  const isKitchenLoginPage = pathname === "/kitchen-login";

  if (isAdminLoginPage || isKitchenLoginPage) {
    return NextResponse.next();
  }

  if (isAdminPage && !hasAdminAccess(req)) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  if (isKitchenPage && !hasKitchenAccess(req)) {
    return NextResponse.redirect(new URL("/kitchen-login", req.url));
  }

  if (isProtectedApi) {
    const hasAccess = hasKitchenAccess(req);

    if (!hasAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/kitchen/:path*",
    "/api/kitchen-orders",
    "/api/order-status",
  ],
};