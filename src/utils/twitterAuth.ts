"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Client, auth } from "twitter-api-sdk";
import { OAuth2UserOptions } from "twitter-api-sdk/dist/OAuth2User";

const getTwitterClients = (token?: OAuth2UserOptions["token"]) => {
  const authClient = new auth.OAuth2User({
    client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!,
    client_secret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET!,
    callback: process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI!,
    scopes: ["tweet.write", "users.read", "tweet.read", "offline.access"],
    token,
  });

  const client = new Client(authClient);

  return { authClient, client };
};

const getTwitterTokenFromCookies = ():
  | OAuth2UserOptions["token"]
  | undefined => {
  const savedToken = cookies().get("token");
  return savedToken ? JSON.parse(savedToken.value) : undefined;
};

const generateAuthURL = (authClient: auth.OAuth2User) => {
  return authClient.generateAuthURL({
    state: "state",
    code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
  });
};

export const login = async (): Promise<void> => {
  const token = getTwitterTokenFromCookies();
  const { authClient } = getTwitterClients(token);
  const url = generateAuthURL(authClient);

  if (url) {
    redirect(url);
  }
};

export const requestAccessToken = async (code: string, state: string) => {
  if (state !== "state") {
    throw new Error("State isn't matching!");
  }

  const token = getTwitterTokenFromCookies();
  console.log(token);

  const { authClient } = getTwitterClients(token);

  generateAuthURL(authClient);

  return authClient.requestAccessToken(code);
};

/**
 * Refreshes the access token for Twitter authentication.
 *
 * @param token - The OAuth2 user token.
 * @returns A promise that resolves to the refreshed access token.
 */
export const refreshToken = async (token?: OAuth2UserOptions["token"]) => {
  const { authClient } = getTwitterClients(token);
  return authClient.refreshAccessToken();
};

/**
 * Logs out the user from Twitter by revoking the access token and deleting the token from cookies.
 */
export const logout = async () => {
  const token = getTwitterTokenFromCookies();
  const { authClient } = getTwitterClients(token);
  await authClient.revokeAccessToken();
  cookies().delete("token");
  redirect("/");
};

/**
 * Retrieves the current user's ID from Twitter API using the provided token.
 * @param token - The OAuth2 token for authentication.
 * @returns The current user's ID.
 * @throws If there are errors returned from the API or if the user ID is not found.
 */
export const getCurrentUserId = async (token: OAuth2UserOptions["token"]) => {
  const { client } = getTwitterClients(token);

  const res = await client.users.findMyUser();

  if (res.errors) {
    throw new Error(res.errors.map((error) => error.detail).join(", "));
  }

  if (!res.data?.id) {
    throw new Error("User ID not found");
  }

  return res.data.id;
};

/**
 * Creates a new tweet using the provided token and text.
 * @param token - The OAuth2 user token.
 * @param text - The content of the tweet.
 * @returns A Promise that resolves to the created tweet.
 */
export const createTweet = async (
  token: OAuth2UserOptions["token"],
  text: string
) => {
  const { client } = getTwitterClients(token);
  return client.tweets.createTweet({ text });
};
