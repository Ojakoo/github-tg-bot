import bot from "../bot";
import config from "../config";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { Webhooks, EmitterWebhookEvent } from "@octokit/webhooks";

const chat_id = config.CHAT_ID;

const webhooks = new Webhooks({
  secret: chat_id,
});

webhooks.on("issues", async ({ id, name, payload }) => {
  await bot.telegram.sendMessage(chat_id, "jep");
});

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    webhooks.receive({
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
