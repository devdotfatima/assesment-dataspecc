import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TwitterService from "@/utils/twitterService";

export const GET = async (request: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  if (!state || !code) {
    return Response.json({ error: "Invalid code" }, { status: 400 });
  }

  const twitterServiceInstance = TwitterService.getInstance();

  const token = await twitterServiceInstance.requestAccessToken(code, state);
  console.log(token);

  cookies().set("token", JSON.stringify(token.token), {
    httpOnly: true,
    secure: true,
  });

  return redirect("/composepost");
};
