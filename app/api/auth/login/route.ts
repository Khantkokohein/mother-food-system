import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const password = String(body.password || "");
    const role = String(body.role || "");

    if (!password || !role) {
      return NextResponse.json(
        { error: "Missing password or role" },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_ACCESS_PASSWORD || "";
    const kitchenPassword = process.env.KITCHEN_ACCESS_PASSWORD || "";

    if (role === "admin") {
      if (password !== adminPassword) {
        return NextResponse.json(
          { error: "Wrong password" },
          { status: 401 }
        );
      }

      const response = NextResponse.json({
        success: true,
        redirectTo: "/admin/orders",
      });

      response.cookies.set("admin_auth", "true", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    if (role === "kitchen") {
      if (password !== kitchenPassword) {
        return NextResponse.json(
          { error: "Wrong password" },
          { status: 401 }
        );
      }

      const response = NextResponse.json({
        success: true,
        redirectTo: "/kitchen",
      });

      response.cookies.set("kitchen_auth", "true", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}