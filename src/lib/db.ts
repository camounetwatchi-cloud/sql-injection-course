import { Pool } from 'pg';

// Create a connection pool to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;

// Helper function for VULNERABLE queries (for demonstration)
// ⚠️ NEVER USE THIS IN PRODUCTION - This is intentionally vulnerable!
export async function vulnerableQuery(query: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}

// Helper function for SECURE queries using parameterized statements
// ✅ This is the correct way to write queries
export async function secureQuery(query: string, params: unknown[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
}
