import z from "zod";

const envSchema = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASSWORD: z.string(),

  LITELLM_LOG: z.string(),
  LITELLM_MASTER_KEY: z.string(),
  LITELLM_URL: z.string(),
  LITELLM_SALT_KEY: z.string(),
  STORE_MODEL_IN_DB: z.string(),
  LITELLM_CACHE: z.string(),

  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string(),
});

export const env = envSchema.parse(process.env);
