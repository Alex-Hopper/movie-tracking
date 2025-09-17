import { Movie, MovieStatus } from "@prisma/client";

export type MovieItem = {
  movie: MoviePreDB;
  status: MovieStatus;
};

export type MoviePreDB = Omit<Movie, "id" | "created_at" | "updated_at">;
