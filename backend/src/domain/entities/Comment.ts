/**
 * Represents a comment made by the user.
 * It can be about the show (episodeId = null) or about a specific episode.
 */
export interface Comment {
  id: number;
  showId: number;
  episodeId: number | null;
  text: string;
  createdAt: Date;
}