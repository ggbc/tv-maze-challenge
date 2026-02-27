/**
 * Represents an episode of a TV show.
 * The "watched" field is local — saved in our database, it doesn't come from the TVMaze API.
 */
export interface Episode {
  id: number;
  showId: number;
  name: string;
  season: number;
  number: number;
  summary: string | null;
  watched: boolean;
}