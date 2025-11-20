import {Agent} from "@voltagent/core";
import {litellmModelToAiSdkModel} from "../ai/core/adapters/litellmModelToAiSdkModel";

export const transcriptionAgent = new Agent({
  name: "Transcription Agent",
  instructions: "Transcribe the audio to text.",
  model: litellmModelToAiSdkModel({
    modelName: "gemini/gemini-2.5-flash",
  }),
});
