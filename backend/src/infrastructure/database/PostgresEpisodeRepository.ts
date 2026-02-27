import { pool } from '../config/database';
import { IEpisodeRepository } from '../../domain/repositories/IEpisodeRepository';
import { Episode } from '../../domain/entities/Episode';

/**
 * Concrete implementation of IEpisodeRepository using PostgreSQL.
 * This is where SQL queries are kept — isolated from business logic.
 */
export class PostgresEpisodeRepository implements IEpisodeRepository {
  async findByShowId(showId: number): Promise<Episode[]> {
    const result = await pool.query(
      'SELECT * FROM episodes WHERE show_id = $1',
      [showId]
    );

    return result.rows.map(this.mapToEntity);
  }

  async save(episode: Episode): Promise<void> {
    // INSERT ... ON CONFLICT: inserts the episode, or updates if it already exists
    await pool.query(
      `INSERT INTO episodes (id, show_id, name, season, number, summary, watched)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO UPDATE SET watched = EXCLUDED.watched`,
      [
        episode.id,
        episode.showId,
        episode.name,
        episode.season,
        episode.number,
        episode.summary,
        episode.watched,
      ]
    );
  }

  async updateWatched(episodeId: number, watched: boolean): Promise<void> {
    await pool.query(
      'UPDATE episodes SET watched = $1 WHERE id = $2',
      [watched, episodeId]
    );
  }

  /**
   * Converts a database row (snake_case) to our entity (camelCase).
   */
  private mapToEntity(row: any): Episode {
    return {
      id: row.id,
      showId: row.show_id,
      name: row.name,
      season: row.season,
      number: row.number,
      summary: row.summary,
      watched: row.watched,
    };
  }
}