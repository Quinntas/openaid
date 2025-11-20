import {createOpenAICompatible} from "@ai-sdk/openai-compatible";
import {env} from "../../../../utils/env";

type Models =
  | "gemini/gemini-2.5-pro"
  | "gemini/gemini-2.5-flash"
  | "gemini/gemini-2.0-flash"
  | "gemini/gemini-2.0-flash-lite"
  | "gemini/gemini-3-pro";

interface LitellmModelToAiSdkModelProps {
  modelName: Models;
  metadata?: {tags: string[]};
  cache?: boolean;
}

export function litellmModelToAiSdkModel(props: LitellmModelToAiSdkModelProps) {
  const model = createOpenAICompatible({
    name: props.modelName,
    baseURL: env.LITELLM_URL,
    apiKey: env.LITELLM_MASTER_KEY,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.LITELLM_MASTER_KEY}`,
    },
    fetch: ((url: any, init: any) => {
      const body: Record<string, unknown> = init ? (init.body ? JSON.parse(init.body as string) : {}) : {};

      return fetch(url, {
        ...init,
        body: JSON.stringify({
          ...body,
          metadata: props.metadata,
          cache: props.cache ? {"no-cache": true} : {},
        }),
      });
    }) as any,
  });
  return model(props.modelName);
}
