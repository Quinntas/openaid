import z from "zod";
import {googleAiModels} from "../ai/core/model";
import {type transcribeDto, transcribeResponseDto} from "./stt.dtos";
import {transcriptionAgentInstructions, transcriptionAgentPrompt} from "./stt.prompts";

export async function transcribeAudio(
  dto: z.infer<typeof transcribeDto>
): Promise<z.infer<typeof transcribeResponseDto>> {
  const arrayBuffer = await dto.file.arrayBuffer();
  const b64File = Buffer.from(arrayBuffer).toString("base64");

  const contents = [
    {role: "system", text: transcriptionAgentInstructions},
    {
      role: "user",
      text: transcriptionAgentPrompt({
        language: dto.language,
      }),
    },
    {
      role: "user",
      inlineData: {
        mimeType: "audio/mp3",
        data: b64File,
      },
    },
  ];

  const response = await googleAiModels.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(transcribeResponseDto),
    },
  });

  return transcribeResponseDto.parse(JSON.parse(response.text || "{}"));
}
