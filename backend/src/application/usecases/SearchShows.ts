import { Show } from '../../domain/entities/Show';
import { IShowService } from '../services/IShowService';

/**
 * Use case: search shows by name.
 * Delegates the search to the external service (TVMaze).
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