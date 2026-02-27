import { IEpisodeRepository } from '../../domain/repositories/IEpisodeRepository';
import { Episode } from '../../domain/entities/Episode';

/**
 * Use case: mark or unmark an episode as watched.
 * Saves the episode to the database if it doesn't exist yet, then updates the status.
 */
export class MarkEpisodeWatched {
  constructor(private readonly episodeRepository: IEpisodeRepository) {}

  async execute(episode: Episode, watched: boolean): Promise<void> {
    // Ensures the episode exists in the database before updating
    await this.episodeRepository.save({ ...episode, watched });

    // Updates the watched status
    await this.episodeRepository.updateWatched(episode.id, watched);
  }
}