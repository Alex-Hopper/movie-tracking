"use server";

import { prisma } from "@/lib/prisma";
import { MoviePreDB } from "@/types/movie";

// search, returns the top 5 list of movies/tv shows by given query.
export async function searchMovies(query: string) {
  if (!query || query.trim() === "") {
    return [];
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("TMDB API key not configured");
  }

  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
    query,
  )}&language=en-US&page=1&include_adult=true`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch movies from TMDB");
  }

  const data = await response.json();
  const results = data.results.slice(0, 5);
  const movies: MoviePreDB[] = [];
  for (const result of results) {
    const movie: MoviePreDB | null = prepareMoviePreDBOject(result);
    try {
      if (movie) {
        addMovieToDB(movie, result.genre_ids);
        movies.push(movie);
      }
    } catch (error) {
      console.error("Failed to add movie to DB:", error);
    }
  }
  return movies;
}

// convert tvShow to movie Object, that we can add to DB
function prepareMoviePreDBOject(media: any): MoviePreDB | null {
  const type = media.media_type;

  if (type !== "movie" && type !== "tv") {
    console.warn("Unsupported media type:", type);
    return null;
  }

  return {
    apiId: media.id,
    title: type === "movie" ? media.title : media.name,
    overview: media.overview,
    poster_path: media.poster_path,
    backdrop_path: media.backdrop_path,
    release_date: type === "movie" ? media.release_date : media.first_air_date,
    vote_average: media.vote_average,
    vote_count: media.vote_count,
    popularity: media.popularity,
    // genre_ids: media.genre_ids,
  } as MoviePreDB;
}

async function addMovieToDB(movie: MoviePreDB, genres?: number[]) {
  const existingMovie = await prisma.movie.findUnique({
    where: { apiId: movie.apiId },
  });

  if (existingMovie) {
    // note, if existing we assume genres are already added as well
    return existingMovie;
  }

  const newMovie = await prisma.movie.create({
    data: movie,
  });

  if (genres?.length) {
    await addGenresToMovie(newMovie.id, genres);
  }

  return newMovie;
}

async function addGenresToMovie(movieId: string, genres: number[]) {
  if (!genres?.length) return;

  return prisma.movie.update({
    where: { id: movieId },
    data: {
      genres: {
        connectOrCreate: genres.map((apiId) => ({
          where: { apiId },
          create: { apiId },
        })),
      },
    },
    include: {
      genres: true,
    },
  });
}
