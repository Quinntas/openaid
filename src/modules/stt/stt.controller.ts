import Elysia, {status} from "elysia";
import {transcribeDto, transcribeResponseDto} from "./stt.dtos";
import {transcribeAudio} from "./stt.service";

export const sttController = new Elysia({
  name: "stt",
  prefix: "/stt",
  tags: ["Speech-to-Text"],
}).post(
  "/transcribe",
  async ({body}) => {
    const res = await transcribeAudio(body);
    return status(200, res);
  },
  {
    body: transcribeDto,
    response: {
      200: transcribeResponseDto,
    },
  }
);
