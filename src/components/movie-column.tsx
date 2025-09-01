"use client";

import { Movie, MovieStatus } from "@prisma/client";
import MovieCard from "./movie-card";

type ColumnProps = {
  color: string;
  status: MovieStatus;
  movies: Movie[];
};

// needs to match enum MovieStatus defined in prisma schema.
const statusMappingToText = {
  TO_WATCH: "To Watch",
  WATCHING: "Watching",
  WAITING: "Waiting for Season",
  WATCHED: "Watched",
};

export default function MovieColumn({ color, status, movies }: ColumnProps) {
  // color loading, needed otherwise cant pass dynamic "color" prop to column, that is, tailwidn will not create the class
  const loadDynamicColors = (
    <div>
      <div className="h-0 w-0 bg-blue-500 bg-blue-500/10"></div>
      <div className="h-0 w-0 bg-yellow-500 bg-yellow-500/10"></div>
      <div className="h-0 w-0 bg-purple-500 bg-purple-500/10"></div>
      <div className="h-0 w-0 bg-green-500 bg-green-500/10"></div>
    </div>
  );

  return (
    <div className="w-full">
      {loadDynamicColors}
      <h2 className="mb-4 text-lg font-semibold">
        <span
          className={`inline-block h-3 w-3 rounded-full bg-${color}-500 mr-2`}
        ></span>
        {statusMappingToText[status as keyof typeof statusMappingToText]}
      </h2>
      {/* TODO: make this scrollable area. */}
      <div className={`bg-${color}-500/10 min-h-16 space-y-4 rounded-lg p-4`}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} status={status} movie={movie} />
        ))}
      </div>
    </div>
  );
}
