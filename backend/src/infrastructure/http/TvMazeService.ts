import axios from 'axios';
import { IShowService } from '../../application/services/IShowService';
import { Show } from '../../domain/entities/Show';
import { Episode } from '../../domain/entities/Episode';

/**
 * Concrete implementation of IShowService using the public TVMaze API.
 * It's in the infrastructure layer because it depends on an external resource (HTTP).
 */
export class TvMazeService implements IShowService {
  private readonly baseUrl = 'https://api.tvmaze.com';

  async searchShows(query: string): Promise<Show[]> {
    const response = await axios.get(`${this.baseUrl}/search/shows`, {
      params: { q: query },
    });

    // The API returns an array of objects { score, show }
    // We need to extract only the show and map it to our entity
    return response.data.map((item: any) => this.mapToShow(item.show));
  }

  async getShowById(id: number): Promise<Show> {
    const response = await axios.get(`${this.baseUrl}/shows/${id}`);
    return this.mapToShow(response.data);
  }

  async getEpisodesByShowId(id: number): Promise<Episode[]> {
    const response = await axios.get(`${this.baseUrl}/shows/${id}/episodes`);
    return response.data.map((item: any) => this.mapToEpisode(item, id));
  }

  /**
   * Converts the TVMaze API format to our Show entity.
   * Isolating this mapping here ensures that API changes don't
   * leak into the rest of the system.
   */
  private mapToShow(data: any): Show {
    return {
      id: data.id,
      name: data.name,
      summary: data.summary ?? null,
      genres: data.genres ?? [],
      premiered: data.premiered ?? null,
      image: data.image
        ? {
            medium: data.image.medium ?? null,
            original: data.image.original ?? null,
          }
        : null,
    };
  }

  /**
   * Converts the TVMaze API format to our Episode entity.
   * The "watched" field always starts as false — the real state
   * comes from the database, not the API.
   */
  private mapToEpisode(data: any, showId: number): Episode {
    return {
      id: data.id,
      showId,
      name: data.name,
      season: data.season,
      number: data.number,
      summary: data.summary ?? null,
      watched: false,
    };
  }
}