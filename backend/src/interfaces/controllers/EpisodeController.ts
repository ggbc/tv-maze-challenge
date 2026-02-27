import { Request, Response } from 'express';
import { MarkEpisodeWatched } from '../../application/usecases/MarkEpisodeWatched';
import { AddComment } from '../../application/usecases/AddComment';
import { PostgresEpisodeRepository } from '../../infrastructure/database/PostgresEpisodeRepository';
import { PostgresCommentRepository } from '../../infrastructure/database/PostgresCommentRepository';

export class EpisodeController {
  private readonly markEpisodeWatched: MarkEpisodeWatched;
  private readonly addCommentUsecase: AddComment;

  constructor() {
    const episodeRepository = new PostgresEpisodeRepository();
    const commentRepository = new PostgresCommentRepository();

    this.markEpisodeWatched = new MarkEpisodeWatched(episodeRepository);
    this.addCommentUsecase = new AddComment(commentRepository);
  }

  /**
   * PATCH /episodes/:id/watched
   * Mark or unmark an episode as watched.
   * Body: { episode: Episode, watched: boolean }
   */
  updateWatched = async (req: Request, res: Response): Promise<void> => {
    try {
      const { episode, watched } = req.body;

      if (!episode || watched === undefined) {
        res.status(400).json({ error: 'episode and watched are required.' });
        return;
      }

      await this.markEpisodeWatched.execute(episode, watched);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Error updating episode.' });
    }
  };

  /**
   * POST /comments
   * Adds a comment to a show or episode.
   * Body: { showId: number, episodeId: number | null, text: string }
   */
  addComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { showId, episodeId, text } = req.body;

      if (!showId || !text) {
        res.status(400).json({ error: 'showId and text are required.' });
        return;
      }

      const comment = await this.addCommentUsecase.execute({
        showId,
        episodeId: episodeId ?? null,
        text,
      });

      res.status(201).json(comment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}