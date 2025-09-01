import { prisma } from "@/lib/prisma";
import HomePage from "@/components/home-page";

export default async function Home() {
  const userId = "cmf06q6kz0000p4d1y9p3t47t";
  const movies = await prisma.userMovie.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    select: {
      status: true,
      movie: true,
    },
  });

  return <HomePage initialMovies={movies} />;
}
