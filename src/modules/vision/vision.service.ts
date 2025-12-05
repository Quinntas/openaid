import type z from "zod/v4";
import {googleAiModels} from "../ai/core/model";
import type {describeImageDto, describeImageResponseDto} from "./vision.dtos";

export async function describeImage(
  dto: z.infer<typeof describeImageDto>
): Promise<z.infer<typeof describeImageResponseDto>> {
  const imageBuffer = await dto.image.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");

  const prompt = dto.prompt || "Describe this image for a visually impaired user.";

  const response = await googleAiModels.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: dto.image.type,
              data: imageBase64,
            },
          },
          {text: prompt},
        ],
      },
    ],
  });

  const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Failed to generate description");
  }

  return {description: text};
}
