import {fromTypes, openapi} from "@elysiajs/openapi";
import {opentelemetry} from "@elysiajs/opentelemetry";
import {Elysia} from "elysia";
import z from "zod";
import {sttController} from "../modules/stt/stt.controller";
import {AuthOpenAPI, auth} from "./auth";

const betterAuth = new Elysia({name: "better-auth"}).mount(auth.handler).macro({
  auth: {
    async resolve({status, request: {headers}}) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session) return status(401);

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
});

const openApi = new Elysia({name: "openapi"}).use(
  openapi({
    path: "/docs",
    mapJsonSchema: {
      zod: z.toJSONSchema,
    },
    references: fromTypes(),
    documentation: {
      info: {
        title: "Elysia OpenAPI Example",
        version: "1.0.0",
        description: "An example of using Elysia with OpenAPI",
      },
      components: await AuthOpenAPI.components,
      paths: await AuthOpenAPI.getPaths(),
    },
  })
);

export const app = new Elysia()
  .use(opentelemetry())
  .use(openApi)
  .use(betterAuth)
  .use(sttController)
  .get("/user/:id", ({params: {pid}}) => pid, {
    auth: true,
    params: z.object({
      pid: z.string(),
    }),
    response: z.string(),
    detail: {
      summary: "Get user by id",
    },
  });
