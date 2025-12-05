import Elysia from "elysia";
import {Languages} from "../ai/core/types/languages";
import {voicesData} from "./tts.data";
import {generateSpeechDto, getVoicesResponseDto} from "./tts.dtos";
import {generateSpeech} from "./tts.service";

export const ttsController = new Elysia({
  name: "tts",
  prefix: "/tts",
  tags: ["Text to Speech"],
})
  .get(
    "/generate/voices",
    () => {
      return {
        languages: Languages,
        voices: voicesData,
      };
    },
    {
      response: getVoicesResponseDto,
    }
  )
  .post(
    "/generate",
    async ({body}) => {
      const {file} = await generateSpeech(body);
      return file;
    },
    {
      body: generateSpeechDto,
    }
  );
