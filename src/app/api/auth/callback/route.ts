import { scalekit } from "../../../../../lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_APP_URL is not defined");
    }

    const redirectUri = `${baseUrl}/api/auth/callback`;

    if (!code) {
        return NextResponse.json({ error: "Code not found" }, { status: 400 });
    }

    const session = await scalekit.authenticateWithCode(code, redirectUri);

    const response = NextResponse.redirect(baseUrl);

    response.cookies.set("access_token", session.accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24,
        path: "/",
    });

    return response;
}