import { Show } from '../../domain/entities/Show';
import { Episode } from '../../domain/entities/Episode';
import { IShowService } from '../services/IShowService';
import { IEpisodeRepository } from '../../domain/repositories/IEpisodeRepository';

interface ShowDetails {
  show: Show;
  episodes: Episode[];
}

/**
 * Use case: fetch show details with its episodes.
 * Combines data from the external API with the local state (watched) from the database.
 */
export class GetShowDetails {
  constructor(
    private readonly showService: IShowService,
    private readonly episodeRepository: IEpisodeRepository
  ) {}

  async execute(showId: number): Promise<ShowDetails> {
    // Fetches show data and episodes in parallel to be faster
    const [show, episodesFromApi] = await Promise.all([
      this.showService.getShowById(showId),
      this.showService.getEpisodesByShowId(showId),
    ]);

    // Fetches the "watched" state saved locally in the database
    const savedEpisodes = await this.episodeRepository.findByShowId(showId);

    // Creates a map for fast lookup: episodeId -> watched
    const watchedMap = new Map(
      savedEpisodes.map((ep) => [ep.id, ep.watched])
    );

    // Combines API data with local state
    const episodes = episodesFromApi.map((ep) => ({
      ...ep,
      watched: watchedMap.get(ep.id) ?? false,
    }));

    return { show, episodes };
  }
}