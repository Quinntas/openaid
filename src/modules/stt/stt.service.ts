import dedent from "dedent";
import type z from "zod";
import {transcriptionAgent} from "./stt.agents";
import {type transcribeDto, transcribeResponseDto} from "./stt.dtos";

export async function transcribeAudio(
  dto: z.infer<typeof transcribeDto>
): Promise<z.infer<typeof transcribeResponseDto>> {
  const res = await transcriptionAgent.generateObject(
    [
      {
        role: "user",
        content: [
          {type: "text", text: dedent`Translate this audio to ${dto.language}`},
          {
            type: "file",
            data: await dto.file.arrayBuffer(),
            mediaType: dto.file.type,
          },
        ],
      },
    ],
    transcribeResponseDto,
    {
      temperature: 0,
    }
  );

  return res.object;
}
