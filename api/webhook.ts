import bot from "../bot";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { Context } from "telegraf";

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
