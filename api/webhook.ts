import config from "../config";

import { Telegraf, Context } from "telegraf";
import { VercelRequest, VercelResponse } from "@vercel/node";

const bot_token = config.BOT_TOKEN;
const bot = new Telegraf(bot_token);

bot.command("hello", async (ctx: Context) => {
  ctx.reply("hello");
});

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;
    console.log(query);
    await bot.handleUpdate(body);
  } catch (error) {
    console.log(error);
  }

  res.status(200).send("OK");
};
