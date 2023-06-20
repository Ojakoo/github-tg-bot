# Github Api Telegram Bot

This is a telegram bot that sends messages based on github api events to a telegram chat. Runs on Node.js and Vercel Edge functions.

## Installation

Install deps and vercel

```
npm install
npm install -g vercel
```

### Local development

Copy .env.example as .env and set the variables.

Use ngrok to get deploy address:

```
ngrok http 3000
```

## Github webhook

Set <DEPLOY_ADDRESS>/api/github as webhook address and your CHAT_ID value as secret in github. These need to be same for octokit/webhooks.

## Telegram webhook

For receiving messages from chats. Set webhook with https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<DEPLOY_ADDRESS>/api/webhook

## Run

Run application locally with:

```
npm run start
```

### Deploy

Deploy to Vercel with just importing the repo and adding the env variables.
