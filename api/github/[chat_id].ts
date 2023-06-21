import bot from "../../bot";
import config from "../../config";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { Webhooks } from "@octokit/webhooks";
import { EmitterWebhookEventWithStringPayloadAndSignature } from "@octokit/webhooks/dist-types/types";

export default async (req: VercelRequest, res: VercelResponse) => {
  const webhooks = new Webhooks({ secret: config.GITHUB_SECRET });
  const chat_id = req.query.chat_id as string;

  const send_message = async (message: string) => {
    await bot.telegram.sendMessage(chat_id, message, {
      parse_mode: "Markdown",
    });
  };

  webhooks.on("pull_request", async ({ payload }) => {
    if (payload.action === "opened") {
      await send_message(
        `${payload.sender.login} opened a pull request [${payload.pull_request.title}](${payload.pull_request.html_url})`
      );
    } else if (payload.action === "closed") {
      await send_message(
        `${payload.sender.login} closed a pull request [${payload.pull_request.title}](${payload.pull_request.html_url})`
      );
    }
  });

  webhooks.on("issues", async ({ payload }) => {
    if (payload.action === "opened") {
      await send_message(
        `${payload.sender.login} opened a new issue [${payload.issue.title}](${payload.issue.html_url})`
      );
    } else if (payload.action === "closed") {
      await send_message(
        `${payload.sender.login} closed an issue [${payload.issue.title}](${payload.issue.html_url})`
      );
    } else if (payload.action === "reopened") {
      await send_message(
        `${payload.sender.login} reopened an issue [${payload.issue.title}](${payload.issue.html_url})`
      );
    }
  });

  try {
    await webhooks.verifyAndReceive({
      id: req.headers["x-github-delivery"],
      name: req.headers["x-github-event"],
      payload: JSON.stringify(req.body),
      signature: req.headers["x-hub-signature-256"],
    } as EmitterWebhookEventWithStringPayloadAndSignature);
  } catch (error) {
    console.log("Error:");
    console.log(error);
    // most likely to  throw for unauthorized so just throwing for it now
    // TODO: add more checking
    res.status(401).send("Unauthorized");
    return;
  }

  res.status(200).send("OK");
};
