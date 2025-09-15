import { Movie, MovieStatus } from "@prisma/client";

export type MovieItem = {
  movie: Movie;
  status: MovieStatus;
};

export type MoviePreDB = Omit<Movie, "id" | "created_at" | "updated_at">;
