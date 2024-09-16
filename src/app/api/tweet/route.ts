import { NextRequest, NextResponse } from "next/server";
import TwitterService from "@/utils/twitterService";

import { OAuth2UserOptions } from "twitter-api-sdk/dist/OAuth2User";
import { cookies } from "next/headers";

const twitterServiceInstance = TwitterService.getInstance();
async function getValidToken(): Promise<
  OAuth2UserOptions["token"] | undefined
> {
  const savedToken = cookies().get("token");

  const token: OAuth2UserOptions["token"] | undefined = savedToken
    ? JSON.parse(savedToken.value)
    : undefined;
  if (!token) {
    throw new Error("No token found in cookies");
  }

  let latestToken = token;
  if (token.expires_at && new Date(token.expires_at) < new Date()) {
    const { token: refreshedToken } = await twitterServiceInstance.refreshToken(
      token
    );
    latestToken = refreshedToken;
  }

  if (token.expires_at && new Date(token.expires_at) < new Date()) {
    const { token: refreshedToken } = await twitterServiceInstance.refreshToken(
      token
    );
    latestToken = refreshedToken;
  }

  return latestToken;
}

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
    const token = await getValidToken();
    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    const response = await twitterServiceInstance.createTweet(caption);

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

export async function GET(request: NextRequest) {
  try {
    const token = await getValidToken();
    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    const user = await twitterServiceInstance.getCurrentUserId(token);

    return NextResponse.json(user);
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
