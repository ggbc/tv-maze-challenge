import { pool } from '../config/database';

/**
 * Creates database tables if they do not already exist.
 * We use "CREATE TABLE IF NOT EXISTS" so this can be run
 * every time the application starts without errors.
 */
export const runMigrations = async (): Promise<void> => {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS episodes (
        id          INTEGER PRIMARY KEY,
        show_id     INTEGER NOT NULL,
        name        VARCHAR(255) NOT NULL,
        season      INTEGER NOT NULL,
        number      INTEGER NOT NULL,
        summary     TEXT,
        watched     BOOLEAN NOT NULL DEFAULT FALSE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id          SERIAL PRIMARY KEY,
        show_id     INTEGER NOT NULL,
        episode_id  INTEGER,
        text        TEXT NOT NULL,
        created_at  TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Migrations executed successfully.');
  } catch (error) {
    console.error('Error executing migrations:', error);
    throw error;
  } finally {
    // Always release the client back to the pool, even if an error occurs
    client.release();
  }
};