import { SearchShows } from '../../src/application/usecases/SearchShows';
import { IShowService } from '../../src/application/services/IShowService';
import { Show } from '../../src/domain/entities/Show';
import { Episode } from '../../src/domain/entities/Episode';

/**
 * Mock of IShowService — fake implementation for tests.
 * Does not make HTTP calls, just returns controlled data.
 */
const makeShowServiceMock = (shows: Show[]): IShowService => ({
  searchShows: async (_query: string) => shows,
  getShowById: async (_id: number) => shows[0],
  getEpisodesByShowId: async (_id: number): Promise<Episode[]> => [],
});

const makeShow = (overrides?: Partial<Show>): Show => ({
  id: 1,
  name: 'Breaking Bad',
  summary: 'A chemistry teacher becomes a drug lord.',
  genres: ['Drama', 'Crime'],
  premiered: '2008-01-20',
  image: { medium: 'http://image.com/medium.jpg', original: 'http://image.com/original.jpg' },
  ...overrides,
});

describe('SearchShows', () => {
  it('should return a list of shows for a valid query', async () => {
    const shows = [makeShow(), makeShow({ id: 2, name: 'Better Call Saul' })];
    const useCase = new SearchShows(makeShowServiceMock(shows));

    const result = await useCase.execute('breaking');

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Breaking Bad');
  });

  it('should return an empty list for an empty query', async () => {
    const useCase = new SearchShows(makeShowServiceMock([]));

    const result = await useCase.execute('');

    expect(result).toEqual([]);
  });

  it('should return an empty list for a query with only spaces', async () => {
    const useCase = new SearchShows(makeShowServiceMock([]));

    const result = await useCase.execute('   ');

    expect(result).toEqual([]);
  });
});