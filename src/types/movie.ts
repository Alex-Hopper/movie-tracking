import { Movie, MovieStatus } from "@prisma/client";

export type MovieItem = {
  movie: Movie;
  status: MovieStatus;
};
