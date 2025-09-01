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
