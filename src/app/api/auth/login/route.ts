import { scalekit } from "../../../../../lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

// 1. Force dynamic rendering so Next.js doesn't execute this at build time
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    // 2. Provide a safe fallback for the environment variable
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const redirectUri = `${baseUrl}/api/auth/callback`;
    
    // 3. Get the URL and redirect
    const url = scalekit.getAuthorizationUrl(redirectUri);
    console.log("Redirecting to:", url);
    
    return NextResponse.redirect(url);
}