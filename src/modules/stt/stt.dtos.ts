import z from "zod";
import {Languages} from "../ai/core/types/languages";

export const transcribeDto = z.object({
  file: z.instanceof(File),
  language: z.enum(Languages),
});

export const transcribeResponseDto = z.object({
  text: z.string(),
});
