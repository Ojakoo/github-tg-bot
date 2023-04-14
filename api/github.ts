import bot from "../bot";
import config from "../config";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { Webhooks, EmitterWebhookEvent } from "@octokit/webhooks";

const chat_id = config.CHAT_ID;

const webhooks = new Webhooks({
  secret: chat_id,
});

webhooks.on("pull_request", async ({ payload }) => {
  if (payload.action === "opened") {
    await bot.telegram.sendMessage(
      chat_id,
      `${payload.sender.login} opened a pull request [${payload.pull_request.title}](${payload.pull_request.html_url})`,
      { parse_mode: "Markdown" }
    );
  } else if (payload.action === "closed") {
    await bot.telegram.sendMessage(
      chat_id,
      `${payload.sender.login} closed a pull request [${payload.pull_request.title}](${payload.pull_request.html_url})`,
      { parse_mode: "Markdown" }
    );
  }
});

webhooks.on("issues", async ({ payload }) => {
  if (payload.action === "opened") {
    await bot.telegram.sendMessage(
      chat_id,
      `${payload.sender.login} opened a new issue [${payload.issue.title}](${payload.issue.html_url})`,
      { parse_mode: "Markdown" }
    );
  } else if (payload.action === "closed") {
    await bot.telegram.sendMessage(
      chat_id,
      `${payload.sender.login} closed an issue [${payload.issue.title}](${payload.issue.html_url})`,
      { parse_mode: "Markdown" }
    );
  } else if (payload.action === "reopened") {
    await bot.telegram.sendMessage(
      chat_id,
      `${payload.sender.login} reopened an issue [${payload.issue.title}](${payload.issue.html_url})`,
      { parse_mode: "Markdown" }
    );
  }
});

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    await webhooks.receive({
      id: req.headers["x-github-delivery"],
      name: req.headers["x-github-event"],
      payload: req.body,
    } as EmitterWebhookEvent);
  } catch (error) {
    console.log("Error:");
    console.log(error);
  }

  res.status(200).send("OK");
};
