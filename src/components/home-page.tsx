"use client";

import { Movie } from "@prisma/client";
import { MovieStatus } from "@prisma/client";
import MovieColumn from "@/components/movie-column";
import { useState } from "react";

interface MovieItem {
  movie: Movie;
  status: MovieStatus;
}

export default function HomePage({
  initialMovies,
}: {
  initialMovies: MovieItem[];
}) {
  const [movies, setMovies] = useState<MovieItem[]>(initialMovies);

  return (
    <div className="m-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <MovieColumn
        color="blue"
        status={MovieStatus.TO_WATCH}
        movies={movies
          .filter((item) => item.status === MovieStatus.TO_WATCH)
          .map((item) => item.movie)}
      />
      <MovieColumn
        color="yellow"
        status={MovieStatus.WATCHING}
        movies={movies
          .filter((item) => item.status === MovieStatus.WATCHING)
          .map((item) => item.movie)}
      />
      <MovieColumn
        color="purple"
        status={MovieStatus.WAITING}
        movies={movies
          .filter((item) => item.status === MovieStatus.WAITING)
          .map((item) => item.movie)}
      />
      <MovieColumn
        color="green"
        status={MovieStatus.WATCHED}
        movies={movies
          .filter((item) => item.status === MovieStatus.WATCHED)
          .map((item) => item.movie)}
      />
    </div>
  );
}
