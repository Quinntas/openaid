import type z from "zod/v4";
import {googleAiModels} from "../ai/core/model";
import type {generateSpeechDto, generateSpeechResponseDto} from "./tts.dtos";

function createWavFile(pcmData: Buffer, sampleRate = 24000): File {
  const channels = 1;
  const bitDepth = 16;
  const byteRate = (sampleRate * channels * bitDepth) / 8;
  const blockAlign = (channels * bitDepth) / 8;
  const dataSize = pcmData.length;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF chunk
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt chunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitDepth, 34);

  // data chunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  pcmData.copy(buffer, 44);

  return new File([buffer], "speech.wav", {type: "audio/wav"});
}

export async function generateSpeech(
  dto: z.infer<typeof generateSpeechDto>
): Promise<z.infer<typeof generateSpeechResponseDto>> {
  const response = await googleAiModels.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [
      {
        parts: [{text: dto.text}],
      },
    ],
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        languageCode: dto.language,
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: dto.voice ?? "Kore",
          },
        },
      },
    },
  });

  const part = response.candidates?.[0]?.content?.parts?.[0];
  if (!part || !part.inlineData || !part.inlineData.data) {
    throw new Error("Failed to generate speech: No audio data received.");
  }

  const audioData = Buffer.from(part.inlineData.data, "base64");
  const file = createWavFile(audioData, 24000);

  return {file};
}
