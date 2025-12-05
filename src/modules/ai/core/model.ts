import {GoogleGenAI} from "@google/genai";
import {env} from "../../../utils/env";

export const googleAiModels = new GoogleGenAI({
  apiKey: env.GOOGLE_API_KEY,
});
