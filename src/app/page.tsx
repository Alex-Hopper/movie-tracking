import { prisma } from "@/lib/prisma";
import HomePage from "@/components/home-page";
import { currentUser } from "@clerk/nextjs/server";
import { MovieItem } from "@/types/movie";

export default async function Home() {
  const clerkUserId = await currentUser().then((user) => user?.id);
  let movies: MovieItem[] = [];
  if (clerkUserId) {
    movies = await prisma.userMovie.findMany({
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
  }

  return <HomePage initialMovies={movies} />;
}
