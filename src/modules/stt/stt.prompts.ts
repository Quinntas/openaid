import dedent from "dedent";
import Handlebars from "handlebars";
import type {Languages} from "../ai/core/types/languages";

export const transcriptionAgentInstructions = dedent`
  You are a transcription agent. Your task is to transcribe the audio file provided by the user into text. You should use the language specified by the user.
`;

export const transcriptionAgentPrompt = Handlebars.compile<{language: Languages}>(dedent`
  Transcribe to this language {{language}}
`);
