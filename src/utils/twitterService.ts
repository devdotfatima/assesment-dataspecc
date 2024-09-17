import { auth, Client } from "twitter-api-sdk";
import { OAuth2UserOptions } from "twitter-api-sdk/dist/OAuth2User";
import { cookies } from "next/headers"; // For cookies handling

class TwitterService {
  private static instance: TwitterService;
  private authClient: auth.OAuth2User;
  private client: Client;

  private constructor() {
    // Initialize the authClient and client with initial parameters
    this.authClient = new auth.OAuth2User({
      client_id: process.env.NEXT_TWITTER_CLIENT_ID!,
      client_secret: process.env.NEXT_TWITTER_CLIENT_SECRET!,
      callback: process.env.NEXT_TWITTER_REDIRECT_URI!,
      scopes: ["tweet.write", "users.read", "tweet.read", "offline.access"],
    });

    this.client = new Client(this.authClient);
  }

  public static getInstance(): TwitterService {
    if (!TwitterService.instance) {
      TwitterService.instance = new TwitterService();
    }
    return TwitterService.instance;
  }

  private setToken(token: OAuth2UserOptions["token"]) {
    this.authClient = new auth.OAuth2User({
      client_id: process.env.NEXT_TWITTER_CLIENT_ID!,
      client_secret: process.env.NEXT_TWITTER_CLIENT_SECRET!,
      callback: process.env.NEXT_TWITTER_REDIRECT_URI!,
      scopes: ["tweet.write", "users.read", "tweet.read", "offline.access"],
      token,
    });
    this.client = new Client(this.authClient);
  }
  private generateAuthURL(authClient: auth.OAuth2User) {
    return authClient.generateAuthURL({
      state: "state",
      code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
    });
  }

  public async authenticate(token: OAuth2UserOptions["token"]): Promise<void> {
    this.setToken(token);
  }

  public async getAuthUrl(): Promise<string | null> {
    try {
      const url = this.authClient.generateAuthURL({
        state: "state",
        code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
      });

      return url || null;
    } catch (error) {
      console.error("Error generating auth URL:", error);
      return null;
    }
  }

  public async requestAccessToken(code: string, state: string) {
    if (state !== "state") {
      throw new Error("State isn't matching!");
    }

    const token = this.getTokenFromCookies();

    if (token) {
      this.setToken(token);
    }

    this.generateAuthURL(this.authClient);
    return this.authClient.requestAccessToken(code);
  }

  public async refreshToken(token?: OAuth2UserOptions["token"]) {
    if (token) {
      this.setToken(token);
    }
    return this.authClient.refreshAccessToken();
  }

  public async logout() {
    const token = this.getTokenFromCookies();
    if (token) {
      this.setToken(token);
      await this.authClient.revokeAccessToken();
      this.deleteTokenFromCookies();
    }
    window.location.href = "/";
  }

  public async getCurrentUserId(token: OAuth2UserOptions["token"]) {
    this.setToken(token);
    const response = await this.client.users.findMyUser();
    if (response.errors) {
      throw new Error(response.errors.map((error) => error.detail).join(", "));
    }
    if (!response.data?.id) {
      throw new Error("User ID not found");
    }
    return response.data;
  }

  public async createTweet(text: string) {
    const token = this.getTokenFromCookies();
    if (token) {
      this.setToken(token);
    }
    console.log({ token, text });

    this.generateAuthURL(this.authClient);

    const response = await this.client.tweets.createTweet({ text });
    return response;
  }

  private getTokenFromCookies(): OAuth2UserOptions["token"] | undefined {
    const savedToken = cookies().get("token");
    return savedToken ? JSON.parse(savedToken.value) : undefined;
  }

  private deleteTokenFromCookies() {
    cookies().delete("token");
  }
}

export default TwitterService;
