import { create } from "zustand";
import { MovieItem } from "@/types/movie";
import { MovieStatus } from "@prisma/client";

type MovieState = {
  movies: MovieItem[];
  setMovies: (movies: MovieItem[]) => void;
  addMovie: (movie: MovieItem) => void;
  updateMovieStatus: (movieApiId: number, newStatus: MovieStatus) => void;
  removeMovie: (movieApiId: number) => void;
};

export const useMoviesStore = create<MovieState>((set) => ({
  movies: [],

  setMovies: (movies) => set({ movies }),

  addMovie: (movie) =>
    set((state) => ({
      movies: [
        movie,
        ...state.movies.filter((m) => m.movie.apiId !== movie.movie.apiId),
      ],
    })),

  updateMovieStatus: (movieId, newStatus) =>
    set((state) => {
      const movieToUpdate = state.movies.find((m) => m.movie.apiId === movieId);
      if (!movieToUpdate) return state;
      const updatedMovie = { ...movieToUpdate, status: newStatus };
      const filteredMovies = state.movies.filter(
        (m) => m.movie.apiId !== movieId,
      );
      return { movies: [updatedMovie, ...filteredMovies] };
    }),

  removeMovie: (movieId) =>
    set((state) => ({
      movies: state.movies.filter((m) => m.movie.apiId !== movieId),
    })),
}));
