import config from "../config";

import { Telegraf, Context } from "telegraf";
import { VercelRequest, VercelResponse } from "@vercel/node";

export const bot_token = config.BOT_TOKEN;
const bot = new Telegraf(bot_token);

bot.command("hello", async (ctx: Context) => {
  ctx.reply("hello");
});

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body } = req;
    await bot.handleUpdate(body);
  } catch (error) {
    console.log("Error:");
    console.log(error);
  }

  res.status(200).send("OK");
};
