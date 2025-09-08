"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { MovieStatus } from "@prisma/client";

export async function updateUserMovieStatus(
  movieId: string,
  newMovieStatus: MovieStatus,
) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const prismaUserId = await prisma.user
    .findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    })
    .then((user) => user?.id);

  if (!prismaUserId) {
    throw new Error("User not found in database");
  }

  await prisma.userMovie.update({
    where: {
      userId_movieId: {
        userId: prismaUserId,
        movieId: movieId,
      },
    },
    data: {
      status: newMovieStatus,
    },
  });
}

export async function deleteUserMovie(movieId: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const prismaUserId = await prisma.user
    .findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    })
    .then((user) => user?.id);

  if (!prismaUserId) {
    throw new Error("User not found in database");
  }

  await prisma.userMovie.delete({
    where: {
      userId_movieId: {
        userId: prismaUserId,
        movieId: movieId,
      },
    },
  });
}

// search
export async function searchMovies(query: string) {
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
  return data.results.slice(0, 5);
}
