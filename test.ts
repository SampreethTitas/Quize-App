import dotenv from "dotenv";
import { Pool } from "@neondatabase/serverless";

dotenv.config();

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log(
  "DATABASE_URL starts with:",
  process.env.DATABASE_URL?.substring(0, 20) + "..."
);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
  const result = await pool.query("SELECT 1 as test");
  console.log("✅ Connection successful:", result.rows);
} catch (error) {
  console.error("❌ Connection failed:", error.message);
} finally {
  await pool.end();
}
