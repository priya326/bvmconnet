import { NextResponse } from "next/server";
import { decrypt } from "../../utils/security";

export function middleware(req) {

    var user = decrypt(localStorage.getItem("user"));
    if (!user) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/*", "/profile/:path*"],
};
