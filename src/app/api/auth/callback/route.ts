import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

// 1. Tell Next.js this route is strictly dynamic (prevents build-time crashes)
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    // 2. Use Next.js built-in nextUrl instead of new URL(req.url)
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    
    // 3. Provide a fallback just in case the env variable fails to load
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const redirectUri = `${baseUrl}/api/auth/callback`;

    if (!code) {
        return NextResponse.json({ message: "code is not found" }, { status: 400 });
    }

    try {
        const session = await scalekit.authenticateWithCode(code, redirectUri);
        console.log("Session:", session);

        const response = NextResponse.redirect(`${baseUrl}`);
        
        // 4. Set secure to true ONLY in production so it works locally on http://
        response.cookies.set("access_token", session.accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production", 
            path: "/"
        });

        return response;
        
    } catch (error) {
        // Catch any errors from Scalekit so your whole app doesn't crash
        console.error("Scalekit Auth Error:", error);
        return NextResponse.redirect(`${baseUrl}/?error=auth_failed`);
    }
}