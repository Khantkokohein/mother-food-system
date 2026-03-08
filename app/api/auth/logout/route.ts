import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  let role = "";

  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    role = String(body.role || "");
  } else {
    const formData = await req.formData().catch(() => null);
    role = String(formData?.get("role") || "");
  }

  const response = NextResponse.redirect(new URL("/", req.url));

  if (role === "admin") {
    response.cookies.set("admin_auth", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });

    return response;
  }

  if (role === "kitchen") {
    response.cookies.set("kitchen_auth", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });

    response.headers.set("Location", "/kitchen-login");
    return response;
  }

  response.cookies.set("admin_auth", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("kitchen_auth", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}