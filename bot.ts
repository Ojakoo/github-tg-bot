import { Telegraf } from "telegraf";
import config from "./config";

const bot_token = config.BOT_TOKEN;

const bot = new Telegraf(bot_token);

export default bot;
