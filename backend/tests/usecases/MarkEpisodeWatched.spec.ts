import { MarkEpisodeWatched } from '../../src/application/usecases/MarkEpisodeWatched';
import { IEpisodeRepository } from '../../src/domain/repositories/IEpisodeRepository';
import { Episode } from '../../src/domain/entities/Episode';

/**
 * Mock of IEpisodeRepository.
 * Stores episodes in memory and tracks which methods were called.
 */
const makeEpisodeRepositoryMock = (): IEpisodeRepository & {
  savedEpisodes: Episode[];
  updatedWatched: { episodeId: number; watched: boolean }[];
} => {
  const savedEpisodes: Episode[] = [];
  const updatedWatched: { episodeId: number; watched: boolean }[] = [];

  return {
    savedEpisodes,
    updatedWatched,
    findByShowId: async (_showId: number) => savedEpisodes,
    save: async (episode: Episode) => {
      savedEpisodes.push(episode);
    },
    updateWatched: async (episodeId: number, watched: boolean) => {
      updatedWatched.push({ episodeId, watched });
    },
  };
};

const makeEpisode = (overrides?: Partial<Episode>): Episode => ({
  id: 1,
  showId: 169,
  name: 'Pilot',
  season: 1,
  number: 1,
  summary: null,
  watched: false,
  ...overrides,
});

describe('MarkEpisodeWatched', () => {
  it('should save the episode and mark it as watched', async () => {
    const repository = makeEpisodeRepositoryMock();
    const useCase = new MarkEpisodeWatched(repository);
    const episode = makeEpisode();

    await useCase.execute(episode, true);

    expect(repository.savedEpisodes).toHaveLength(1);
    expect(repository.updatedWatched[0]).toEqual({ episodeId: 1, watched: true });
  });

  it('should save the episode and mark it as unwatched', async () => {
    const repository = makeEpisodeRepositoryMock();
    const useCase = new MarkEpisodeWatched(repository);
    const episode = makeEpisode({ watched: true });

    await useCase.execute(episode, false);

    expect(repository.updatedWatched[0]).toEqual({ episodeId: 1, watched: false });
  });
});