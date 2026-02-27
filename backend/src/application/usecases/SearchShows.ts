import { Show } from '../../domain/entities/Show';
import { IShowService } from '../services/IShowService';

/**
 * Caso de uso: buscar séries pelo nome.
 * Delega a busca para o serviço externo (TVMaze).
 */
export class SearchShows {
  constructor(private readonly showService: IShowService) {}

  async execute(query: string): Promise<Show[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    return this.showService.searchShows(query.trim());
  }
}