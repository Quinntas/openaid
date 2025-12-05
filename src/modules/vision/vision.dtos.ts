import z from "zod/v4";

export const describeImageDto = z.object({
  image: z.instanceof(File),
  prompt: z.string().optional(),
});

export const describeImageResponseDto = z.object({
  description: z.string(),
});
