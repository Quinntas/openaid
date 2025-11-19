import {drizzle} from "drizzle-orm/node-postgres";
import {dbPool} from "./db";

export const db = drizzle({client: dbPool});
