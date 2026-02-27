import axios from 'axios';
import { IShowService } from '../../application/services/IShowService';
import { Show } from '../../domain/entities/Show';
import { Episode } from '../../domain/entities/Episode';

/**
 * Implementação concreta do IShowService usando a API pública do TVMaze.
 * Fica na camada de infrastructure porque depende de um recurso externo (HTTP).
 */
export class TvMazeService implements IShowService {
  private readonly baseUrl = 'https://api.tvmaze.com';

  async searchShows(query: string): Promise<Show[]> {
    const response = await axios.get(`${this.baseUrl}/search/shows`, {
      params: { q: query },
    });

    // A API retorna um array de objetos { score, show }
    // Precisamos extrair apenas o show e mapear para nossa entity
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
   * Converte o formato da API TVMaze para nossa entity Show.
   * Isolar esse mapeamento aqui garante que mudanças na API não
   * vazam para o resto do sistema.
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
   * Converte o formato da API TVMaze para nossa entity Episode.
   * O campo "watched" começa sempre como false — o estado real
   * vem do banco de dados, não da API.
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