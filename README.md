# Github Api Telegram Bot

This is a telegram bot that sends messages based on github api events to a telegram chat. Application allows configuring multiple github webhooks for both different repositories and telegram chats, so you need to only run single instance of this application.

Runs on Node.js and [Vercel Edge functions](https://vercel.com/docs/concepts/functions/edge-functions).

# Getting started

## Dependencies

Install deps and vercel

```
npm install
npm install -g vercel
```

## Local development

Copy .env.example as .env and set the variables.

```
cp .env.example .env
```

Use ngrok to get deploy address for local testing:

```
ngrok http 3000
```

## Github webhook

Set <DEPLOY_ADDRESS>/api/github/<chat_id> as webhook address and your <GITHUB_SECRET> env value as secret in github. Application logic for handling github messages is in /api/github/[chat_id].ts. Note that the <GITHUB_SECRET> value is global and used for all github webhooks.

## Telegram webhook

For receiving messages from chats. Set webhook with https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<DEPLOY_ADDRESS>/api/telegram. Application for handling telegram messages is in /api/telegram.ts.

## Run

Run application locally with:

```
npm run start
```

# Deploy

Deploy to [Vercel](https://vercel.com) with just importing the repo and adding the env variables and you should be good to go!
