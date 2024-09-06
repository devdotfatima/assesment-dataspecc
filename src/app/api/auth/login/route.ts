import { NextResponse } from "next/server";
// export async function GET() {
//   const response = NextResponse.redirect(
//     new URL(`/api/auth/callback`, process.env.NEXT_PUBLIC_APP_URL!)
//   );

//   response.cookies.set("code_verifier", codeVerifier, {
//     httpOnly: true,
//     path: "/",
//     sameSite: "lax",
//   });

//   const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
//     redirectUri
//   )}&scope=tweet.read%20tweet.write&state=state&code_challenge=${codeChallenge}&code_challenge_method=S256`;

//   // Redirect to Twitter OAuth
//   return NextResponse.redirect(twitterAuthUrl);
// }
