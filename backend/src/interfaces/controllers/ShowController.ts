import { Request, Response } from 'express';
import { SearchShows } from '../../application/usecases/SearchShows';
import { GetShowDetails } from '../../application/usecases/GetShowDetails';
import { TvMazeService } from '../../infrastructure/http/TvMazeService';
import { PostgresEpisodeRepository } from '../../infrastructure/database/PostgresEpisodeRepository';
import { PostgresCommentRepository } from '../../infrastructure/database/PostgresCommentRepository';

/**
 * Controller responsible for show routes.
 * Instantiates Use Cases with their concrete dependencies.
 */
export class ShowController {
  private readonly searchShows: SearchShows;
  private readonly getShowDetails: GetShowDetails;
  private readonly commentRepository: PostgresCommentRepository;  

  constructor() {
    const tvMazeService = new TvMazeService();
    const episodeRepository = new PostgresEpisodeRepository();

    this.searchShows = new SearchShows(tvMazeService);
    this.getShowDetails = new GetShowDetails(tvMazeService, episodeRepository);
    this.commentRepository = new PostgresCommentRepository();        
  }

  /**
   * GET /shows/:id/comments
   * Returns comments for a specific show.
   */  
    getComments = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const comments = await this.commentRepository.findByShowId(id);
        res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching comments.' });
    }
    };

  /**
   * GET /shows?q=query
   * Search shows by name.
   */
  search = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.q as string;

      if (!query) {
        res.status(400).json({ error: 'Parameter q is required.' });
        return;
      }

      const shows = await this.searchShows.execute(query);
      res.json(shows);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching shows.' });
    }
  };

  /**
   * GET /shows/:id
   * Returns show details with its episodes.
   */
  getDetails = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID.' });
        return;
      }

      const details = await this.getShowDetails.execute(id);
      res.json(details);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching show details.' });
    }
  };
}