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

    const cookiesStore = cookies();

    cookiesStore.set("token", JSON.stringify(token.token), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const sessionExpirationDate = new Date();
    sessionExpirationDate.setDate(sessionExpirationDate.getDate() + 30);

    cookiesStore.set(
      "session_expiration",
      sessionExpirationDate.toISOString(),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60,
      }
    );

    const redirectUrl = new URL("/composepost", request.url);
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Error requesting access token:", error);
    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }
};
