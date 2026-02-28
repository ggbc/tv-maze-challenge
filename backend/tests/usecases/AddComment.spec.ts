import { AddComment } from '../../src/application/usecases/AddComment';
import { ICommentRepository } from '../../src/domain/repositories/ICommentRepository';
import { Comment } from '../../src/domain/entities/Comment';

const makeCommentRepositoryMock = (): ICommentRepository => ({
  findByShowId: async (_showId: number) => [],
  findByEpisodeId: async (_episodeId: number) => [],
  save: async (input): Promise<Comment> => ({
    id: 1,
    showId: input.showId,
    episodeId: input.episodeId,
    text: input.text,
    createdAt: new Date(),
  }),
});

describe('AddComment', () => {
  it('should add a comment about the show', async () => {
    const useCase = new AddComment(makeCommentRepositoryMock());

    const result = await useCase.execute({
      showId: 169,
      episodeId: null,
      text: 'Amazing show!',
    });

    expect(result.text).toBe('Amazing show!');
    expect(result.episodeId).toBeNull();
  });

  it('should add a comment about a specific episode', async () => {
    const useCase = new AddComment(makeCommentRepositoryMock());

    const result = await useCase.execute({
      showId: 169,
      episodeId: 1,
      text: 'Favorite episode!',
    });

    expect(result.episodeId).toBe(1);
  });

  it('should throw error for empty comment', async () => {
    const useCase = new AddComment(makeCommentRepositoryMock());

    await expect(
      useCase.execute({ showId: 169, episodeId: null, text: '' })
    ).rejects.toThrow('Comment cannot be empty.');
  });

  it('should trim extra spaces from comment text', async () => {
    const useCase = new AddComment(makeCommentRepositoryMock());

    const result = await useCase.execute({
      showId: 169,
      episodeId: null,
      text: '  Great show!  ',
    });

    expect(result.text).toBe('Great show!');
  });
});