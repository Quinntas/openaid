import Elysia from "elysia";
import {describeImageDto, describeImageResponseDto} from "./vision.dtos";
import {describeImage} from "./vision.service";

export const visionController = new Elysia({
  name: "vision",
  prefix: "/vision",
  tags: ["Vision"],
}).post(
  "/describe",
  async ({body}) => {
    return await describeImage(body);
  },
  {
    body: describeImageDto,
    response: describeImageResponseDto,
  }
);
