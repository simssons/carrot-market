import { NextFetchEvent, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ua = userAgent(req);
  // console.log(ua);
  // if (ua?.isBot) {
  //   return new Response("Please don't be bot"); //no longer works
  // }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.has("carrotsession")) {
      return NextResponse.redirect(new URL("/enter", req.url));
    }
    // if (req.nextUrl.pathname.startsWith("/chats")) {
    //   console.log("chats");
    // }
  }
  // req.geo?.country
  // hosting provider 에 따라 다름.
}
export const config = {
  matcher: "/",
};
