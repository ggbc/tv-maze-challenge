import { Comment } from '../entities/Comment';

/**
 * Contract that any comment repository must follow.
 */
export interface ICommentRepository {
  /**
   * Fetches all comments for a show.
   */
  findByShowId(showId: number): Promise<Comment[]>;

  /**
   * Fetches comments for a specific episode.
   */
  findByEpisodeId(episodeId: number): Promise<Comment[]>;

  /**
   * Saves a new comment.
   */
  save(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment>;
}