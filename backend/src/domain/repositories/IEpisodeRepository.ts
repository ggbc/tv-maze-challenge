import { Episode } from '../entities/Episode';

/**
 * Contract that any episode repository must follow.
 * The Use Case depends on this interface, never the concrete implementation.
 */
export interface IEpisodeRepository {
  /**
   * Fetches all episodes of a show by the show's ID.
   */
  findByShowId(showId: number): Promise<Episode[]>;

  /**
   * Saves an episode to the database (creates if it doesn't exist, updates if it does).
   */
  save(episode: Episode): Promise<void>;

  /**
   * Updates the "watched" status of an episode.
   */
  updateWatched(episodeId: number, watched: boolean): Promise<void>;
}