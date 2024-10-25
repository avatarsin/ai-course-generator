import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(
  "postgresql://neondb_owner:8P2eJQsXYdnS@ep-lively-glitter-a5fenv8v.us-east-2.aws.neon.tech/neondb?sslmode=require"
);
export const db = drizzle({ client: sql });
