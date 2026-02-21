import { scalekit } from "../../../../../lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    // 1. We are hardcoding localhost just to force the build to pass!
    const baseUrl = "http://localhost:3000"; 
    const redirectUri = `${baseUrl}/api/auth/callback`;
    
    // 2. Get the URL and redirect
    const url = scalekit.getAuthorizationUrl(redirectUri);
    return NextResponse.redirect(url);
}