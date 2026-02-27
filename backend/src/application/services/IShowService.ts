import { Show } from '../../domain/entities/Show';
import { Episode } from '../../domain/entities/Episode';

/**
 * Contract for any service that fetches show data externally.
 * Today it's TVMaze. Tomorrow it could be another provider — the Use Case wouldn't know the difference.
 */
export interface IShowService {
  /**
   * Searches shows by name.
   */
  searchShows(query: string): Promise<Show[]>;

  /**
   * Fetches show details by ID.
   */
  getShowById(id: number): Promise<Show>;

  /**
   * Fetches all episodes of a show by its ID.
   */
  getEpisodesByShowId(id: number): Promise<Episode[]>;
}