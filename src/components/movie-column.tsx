"use client"

import { Movie } from "@/types/movie";
import MovieCard from "./movie-card";

type ColumnProps = {
  color: string;
  status: string;
  movies: Movie[];
};

const statusMappingToText = {
  "to-watch": "To Watch",
  "watching": "Watching",
  "waiting": "Waiting for Season",
  "watched": "Watched",
}

export default function MovieColumn({ color, status, movies }: ColumnProps) {
  // color loading, needed otherwise cant pass dynamic "color" prop to column, that is, tailwidn will not create the class
  const loadDynamicColors = () => {
    return (
      <div>
        <div className="h-0 w-0 bg-blue-500 bg-blue-500/10"></div>
        <div className="h-0 w-0 bg-yellow-500 bg-yellow-500/10"></div>
        <div className="h-0 w-0 bg-purple-500 bg-purple-500/10"></div>
        <div className="h-0 w-0 bg-green-500 bg-green-500/10"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {loadDynamicColors()}
      <h2 className="text-lg font-semibold mb-4">
        <span className={`inline-block h-3 w-3 rounded-full bg-${color}-500 mr-2`}></span>
        {statusMappingToText[status as keyof typeof statusMappingToText]}</h2>
      {/* TODO: make this scrollable area. */}
      <div className={`bg-${color}-500/10 p-4 rounded-lg space-y-4 min-h-16`}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
