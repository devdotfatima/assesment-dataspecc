import { NextRequest, NextResponse } from "next/server";
import TwitterService from "@/utils/twitterService";

export const GET = async (request: NextRequest) => {
  console.log("Generating auth URL");

  try {
    const twitterService = TwitterService.getInstance();
    const url = await twitterService.getAuthUrl();

    if (!url) {
      return NextResponse.json(
        { message: "Failed to generate auth URL" },
        { status: 500 }
      );
    }

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
