import * as dotenv from "dotenv";
import * as path from "path";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

interface ENV {
  BOT_TOKEN: string | undefined;
  CHAT_ID: string | undefined;
}

interface Config {
  BOT_TOKEN: string;
  CHAT_ID: string;
}

const getConfig = (): ENV => {
  return {
    BOT_TOKEN: process.env.BOT_TOKEN,
    CHAT_ID: process.env.CHAT_ID,
  };
};

const getVerifiedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();
const verifiedConfig = getVerifiedConfig(config);

export default verifiedConfig;
