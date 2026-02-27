/**
 * Represents a TV show.
 * This entity is the heart of the domain — it doesn't depend on a database, HTTP, or framework.
 */
export interface Show {
  id: number;
  name: string;
  summary: string | null;
  genres: string[];
  premiered: string | null;
  image: {
    medium: string | null;
    original: string | null;
  } | null;
}