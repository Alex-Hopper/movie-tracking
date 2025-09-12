import { Movie, MovieStatus } from "@prisma/client";

export type MovieItem = {
  movie: Movie;
  status: MovieStatus;
};

export type MovieSearchResult = {
  apiId: number;
  title: string | null;
  name: string | null;
  overview: string | null;
  backdrop_path: string | null;
  poster_path: string | null;
};
