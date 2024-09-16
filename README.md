# POST COMPOSER

This project is a **Next.js 14** application that integrates with the **Twitter API** to allow users to authenticate with Twitter via OAuth 2.0, post tweets. The app includes a UI where users can compose tweets (up to 280 characters), preview them, and post directly to Twitter.

## Features

- **OAuth 2.0 Twitter Authentication**: Users can connect their Twitter acoount.
- **Post Tweets**: After connecting, users can compose and post tweets (up to 280 characters).
- **Twitter API SDK**: Uses the Twitter API SDK for handling requests to Twitter.

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── tweet/
│   │   ├──────  route.ts        # API route for posting tweets
│   │   ├── auth/
│   │   └──────callback/
│   │   └────────────── route.ts # Twitter OAuth flow and API requests
│   ├── composepost/
│   ├────────────page.tsx        # Main page for composing and posting tweets
|   ├── layout.tsx
│   └── page.tsx                 # Home page
├── components/
│   ├── Footer.tsx                # Footer component with post button
│   └── Header.tsx                # Optional Header
├── utils/
│   ├── twitterAuth.ts            # Twitter OAuth and API request helper functions
│   ├── types.ts
│   ├── consts.ts
├── assets/                       # Image assets for UI
├── public/                       # Public directory for static assets
├── .env                          # Environment variables (add your own keys)
└── README.md                     # Instructions for setting up the project
```

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn** package manager
- A **Twitter Developer Account** with API access

### Setup Instructions

1. **Clone the repository**:

```bash
git clone https://github.com/devdotfatima/assesment-dataspecc
cd assesment-dataspecc
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**:

Create a `.env` file in the root of the project and add your Twitter API keys and other environment variables:

```bash
NEXT_TWITTER_API_KEY=
NEXT_TWITTER_API_KEY_SECRET=
NEXT_TWITTER_BEARER_TOKEN=
NEXT_TWITTER_ACCESS_TOKEN=
NEXT_TWITTER_ACCESS_SECRET=
NEXT_TWITTER_CLIENT_ID=
NEXT_TWITTER_CLIENT_SECRET=

NEXT_APP_URL=http://localhost:3000
NEXT_TWITTER_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

4. **Run the development server**:

```bash
npm run dev
# or
yarn dev
```

Your application should now be running at `http://localhost:3000`.

---

### API Integration Details

- **Authentication**: We use **NextAuth.js** for OAuth 2.0 with Twitter. Upon successful login, the access token is stored in cookies for future API requests.
- **Tweet Posting**: A POST request is sent to the `/api/tweet` route, which uses the access token to post tweets on behalf of the authenticated user.

**API Route: `/api/tweet`**

This API route is responsible for:

1. Extracting the user’s access token from cookies.
2. Using the **Twitter API SDK** to post the tweet.
3. Handling errors and sending appropriate responses.

## Troubleshooting

### Common Issues:

- **Invalid Redirect URI**: Ensure that the `NEXT_TWITTER_REDIRECT_URI` matches exactly what you have configured in the Twitter Developer Portal.
- **Rate Limits**: The Twitter API has rate limits for requests. Check the [Twitter Developer Documentation](https://developer.twitter.com/en/docs/twitter-api) for more information on these limits.
