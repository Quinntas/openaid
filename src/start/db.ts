import {env} from "better-auth/*";
import {Pool} from "pg";

export const dbPool = new Pool({
  connectionString: env.DATABASE_URL,
});
