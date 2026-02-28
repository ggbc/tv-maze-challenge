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

export interface Episode {
  id: number;
  showId: number;
  name: string;
  season: number;
  number: number;
  summary: string | null;
  watched: boolean;
}

export interface Comment {
  id: number;
  showId: number;
  episodeId: number | null;
  text: string;
  createdAt: string;
}