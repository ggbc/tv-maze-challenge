import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * PostgreSQL connection pool.
 * A Pool reuses open connections instead of opening a new one for each query
 * — much more efficient in web applications.
 */
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Tests the database connection when the application starts.
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully.');
    client.release();
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};