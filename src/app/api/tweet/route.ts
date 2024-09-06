import { NextRequest, NextResponse } from "next/server";
import * as twitter from "@/utils/twitterAuth";
import { OAuth2UserOptions } from "twitter-api-sdk/dist/OAuth2User";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { caption } = await request.json();

    if (!caption || caption.length > 280) {
      return NextResponse.json(
        {
          message: "Invalid post content",
        },
        { status: 400 }
      );
    }
    const savedToken = cookies().get("token");

    const token: OAuth2UserOptions["token"] | undefined = savedToken
      ? JSON.parse(savedToken.value)
      : undefined;
    if (!token) {
      throw new Error("No token found in cookies");
    }
    console.log(caption, "inside here", token);

    let latestToken = token;
    if (token.expires_at && new Date(token.expires_at) < new Date()) {
      const { token: refreshedToken } = await twitter.refreshToken(token);
      latestToken = refreshedToken;
    }

    if (token.expires_at && new Date(token.expires_at) < new Date()) {
      const { token: refreshedToken } = await twitter.refreshToken(token);
      latestToken = refreshedToken;
    }

    const response = await twitter.createTweet(latestToken, caption);
    console.log(response);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Failed to post to Twitter:", error);
    return NextResponse.json(
      {
        message: "Failed to post to Twitter",
        error,
      },
      { status: 500 }
    );
  }
}
