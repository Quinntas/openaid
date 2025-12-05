import z from "zod/v4";
import {Languages} from "../ai/core/types/languages";

export const transcribeDto = z.object({
  file: z.instanceof(File),
  language: z.nativeEnum(Languages),
});

export const transcribeResponseDto = z.object({
  text: z.string(),
});
