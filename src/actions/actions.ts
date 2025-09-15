"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { MovieStatus } from "@prisma/client";

export async function addUserMovie(movieId: string, status: MovieStatus) {
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
