import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import {env} from "../utils/env";

export const db = drizzle({
  client: new Pool({
    connectionString: env.DATABASE_URL,
  }),
});
