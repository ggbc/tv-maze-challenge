import { Comment } from '../../domain/entities/Comment';
import { ICommentRepository } from '../../domain/repositories/ICommentRepository';

interface AddCommentInput {
  showId: number;
  episodeId: number | null;
  text: string;
}

/**
 * Use case: add a comment to a show or episode.
 */
export class AddComment {
  constructor(private readonly commentRepository: ICommentRepository) {}

  async execute(input: AddCommentInput): Promise<Comment> {
    if (!input.text || input.text.trim().length === 0) {
      throw new Error('Comment cannot be empty.');
    }

    return this.commentRepository.save({
      showId: input.showId,
      episodeId: input.episodeId,
      text: input.text.trim(),
    });
  }
}