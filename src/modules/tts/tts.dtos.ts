import z from "zod/v4";
import {Languages, Voices} from "../ai/core/types/languages";

export const generateSpeechDto = z.object({
  text: z.string(),
  language: z.nativeEnum(Languages).optional(),
  voice: z.nativeEnum(Voices).optional(),
});

export const generateSpeechResponseDto = z.object({
  file: z.instanceof(File),
});

export const getVoicesResponseDto = z.object({
  languages: z.record(z.string(), z.string()),
  voices: z.record(
    z.string(),
    z.object({
      gender: z.union([z.literal("Male"), z.literal("Female")]),
      characteristic: z.string(),
    })
  ),
});
