import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import TwitterService from "@/utils/twitterService";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  if (!state || !code) {
    return NextResponse.json(
      { error: "Invalid state or code" },
      { status: 400 }
    );
  }

  try {
    const twitterServiceInstance = TwitterService.getInstance();
    const token = await twitterServiceInstance.requestAccessToken(code, state);

    console.log(token);

    const cookiesStore = cookies(); // Get cookies instance
    cookiesStore.set("token", JSON.stringify(token.token), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure flag only in production
    });

    return NextResponse.redirect("/composepost");
  } catch (error) {
    console.error("Error requesting access token:", error);
    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }
};
