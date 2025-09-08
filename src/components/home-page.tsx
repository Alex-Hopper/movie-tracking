"use client";

import { Movie } from "@prisma/client";
import { MovieStatus } from "@prisma/client";
import MovieColumn from "@/components/movie-column";
import { useState } from "react";
import { updateUserMovieStatus, deleteUserMovie } from "@/actions/actions";
import { toast } from "sonner";
import { SignedOut } from "@clerk/nextjs";
import SignedOutBanner from "./signed-out-banner";
import { MovieItem } from "@/types/movie";

export default function HomePage({
  initialMovies,
}: {
  initialMovies: MovieItem[];
}) {
  const [movies, setMovies] = useState<MovieItem[]>(initialMovies);

  async function changeStatus(movieId: string, newStatus: MovieStatus) {
    const oldMovies = structuredClone(movies);

    // we're removing and adding to start so that it gets placed on top of new column.
    const moviesWithSelectedRemoved = movies.filter(
      (item) => item.movie.id !== movieId,
    );
    const selectedMovie = movies.find((item) => item.movie.id === movieId);
    if (!selectedMovie) return;
    setMovies([
      { movie: selectedMovie.movie, status: newStatus },
      ...moviesWithSelectedRemoved,
    ]);

    try {
      await updateUserMovieStatus(movieId, newStatus);
    } catch (error) {
      toast.error("Failed to update movie status. Please try again.");
      // revert optimistic update
      setMovies(oldMovies);
    }
  }

  async function removeMovie(movieId: string) {
    const oldMovies = structuredClone(movies);
    const movieToDelete = movies.find((item) => item.movie.id === movieId);
    const moviesWithSelectedRemoved = movies.filter(
      (item) => item.movie.id !== movieId,
    );
    setMovies(moviesWithSelectedRemoved);

    try {
      await deleteUserMovie(movieId);
      toast.success(`Removed ${movieToDelete?.movie.title} from your list.`);
    } catch (error) {
      toast.error("Failed to remove movie. Please try again.");
      setMovies(oldMovies);
    }
  }

  return (
    <div className="m-4 w-full space-y-4">
      {/* TODO: uncomment SignedOut when set up. */}
      {/* <SignedOut> */}
      <SignedOutBanner />
      {/* </SignedOut> */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MovieColumn
          color="blue"
          status={MovieStatus.TO_WATCH}
          movies={movies
            .filter((item) => item.status === MovieStatus.TO_WATCH)
            .map((item) => item.movie)}
          onStatusChange={changeStatus}
          onRemove={removeMovie}
        />
        <MovieColumn
          color="yellow"
          status={MovieStatus.WATCHING}
          movies={movies
            .filter((item) => item.status === MovieStatus.WATCHING)
            .map((item) => item.movie)}
          onStatusChange={changeStatus}
          onRemove={removeMovie}
        />
        <MovieColumn
          color="purple"
          status={MovieStatus.WAITING}
          movies={movies
            .filter((item) => item.status === MovieStatus.WAITING)
            .map((item) => item.movie)}
          onStatusChange={changeStatus}
          onRemove={removeMovie}
        />
        <MovieColumn
          color="green"
          status={MovieStatus.WATCHED}
          movies={movies
            .filter((item) => item.status === MovieStatus.WATCHED)
            .map((item) => item.movie)}
          onStatusChange={changeStatus}
          onRemove={removeMovie}
        />
      </div>
    </div>
  );
}
