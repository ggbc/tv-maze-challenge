import { pool } from '../config/database';
import { ICommentRepository } from '../../domain/repositories/ICommentRepository';
import { Comment } from '../../domain/entities/Comment';

export class PostgresCommentRepository implements ICommentRepository {
  async findByShowId(showId: number): Promise<Comment[]> {
    const result = await pool.query(
      'SELECT * FROM comments WHERE show_id = $1 ORDER BY created_at DESC',
      [showId]
    );

    return result.rows.map(this.mapToEntity);
  }

  async findByEpisodeId(episodeId: number): Promise<Comment[]> {
    const result = await pool.query(
      'SELECT * FROM comments WHERE episode_id = $1 ORDER BY created_at DESC',
      [episodeId]
    );

    return result.rows.map(this.mapToEntity);
  }

  async save(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    const result = await pool.query(
      `INSERT INTO comments (show_id, episode_id, text)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [comment.showId, comment.episodeId, comment.text]
    );

    return this.mapToEntity(result.rows[0]);
  }

  private mapToEntity(row: any): Comment {
    return {
      id: row.id,
      showId: row.show_id,
      episodeId: row.episode_id,
      text: row.text,
      createdAt: row.created_at,
    };
  }
}