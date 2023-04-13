require("dotenv").config();

import { Context, Telegraf } from "telegraf";

if (process.env.BOT_TOKEN) {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.command("hello", async (ctx: Context) => {
    ctx.reply("hello");
  });

  bot.launch();

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
} else {
  console.log("missing some environment variables...");
}
