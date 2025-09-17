"use server";

import { prisma } from "@/lib/prisma";
import { MovieStatus } from "@prisma/client";
import { getUserId, getMovieIDFromApiId } from "./utils/utils";

export async function addUserMovie(movieApiId: number, status: MovieStatus) {
  const prismaUserId = await getUserId();

  const movieId = await getMovieIDFromApiId(movieApiId);

  await prisma.userMovie.upsert({
    where: {
      userId_movieId: {
        userId: prismaUserId,
        movieId: movieId,
      },
    },
    update: {
      status: status,
    },
    create: {
      userId: prismaUserId,
      movieId: movieId,
      status: status,
    },
  });
}

export async function deleteUserMovie(movieApiId: number) {
  const prismaUserId = await getUserId();

  const movieId = await getMovieIDFromApiId(movieApiId);

  await prisma.userMovie.delete({
    where: {
      userId_movieId: {
        userId: prismaUserId,
        movieId: movieId,
      },
    },
  });
}

export async function updateUserMovieStatus(
  movieApiId: number,
  newMovieStatus: MovieStatus,
) {
  const prismaUserId = await getUserId();

  const movieId = await getMovieIDFromApiId(movieApiId);

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
