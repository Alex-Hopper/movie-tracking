"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getMovieIDFromApiId(movieApiId: number): Promise<string> {
  const movie = await prisma.movie.findUnique({
    where: { apiId: movieApiId },
    select: { id: true },
  });

  if (!movie) {
    throw new Error("Movie not found in database");
  }

  return movie.id;
}

export async function getUserId(): Promise<string> {
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

  return prismaUserId;
}
