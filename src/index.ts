import "dotenv/config";
import {app} from "./start/app";

app.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
