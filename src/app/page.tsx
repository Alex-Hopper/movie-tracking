import { prisma } from "@/lib/prisma";
import HomePage from "@/components/home-page";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const clerkUserId = await currentUser().then((user) => user?.id);
  if (!clerkUserId) {
    return <div>Please sign in to see your movies.</div>;
  }
  const movies = await prisma.userMovie.findMany({
    where: {
      user: {
        clerkId: clerkUserId,
      },
    },
    select: {
      status: true,
      movie: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return <HomePage initialMovies={movies} />;
}
