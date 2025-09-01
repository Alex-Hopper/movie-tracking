import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const movies: Prisma.MovieCreateInput[] = [
  {
    apiId: 1,
    title: "Inception",
    backdrop_path: "/vgnoBSVzWAV9sNQUORaDGvDp7wx.jpg",
  },
  {
    apiId: 2,
    title: "The Matrix",
    backdrop_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    apiId: 3,
    title: "Interstellar",
    backdrop_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    apiId: 4,
    title: "The Dark Knight",
    backdrop_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    apiId: 5,
    title: "Pulp Fiction",
    backdrop_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
];

const users: Prisma.UserCreateInput[] = [
  {
    clerkId: "user_1",
  },
];

const userMovies: Prisma.UserMovieCreateInput[] = [
  {
    status: "WATCHED",
    movie: {
      connect: { apiId: 1 },
    },
    user: {
      connect: { clerkId: "user_1" },
    },
  },
  {
    status: "WATCHING",
    movie: {
      connect: { apiId: 2 },
    },
    user: {
      connect: { clerkId: "user_1" },
    },
  },
  {
    status: "TO_WATCH",
    movie: {
      connect: { apiId: 3 },
    },
    user: {
      connect: { clerkId: "user_1" },
    },
  },
  {
    status: "WAITING",
    movie: {
      connect: { apiId: 4 },
    },
    user: {
      connect: { clerkId: "user_1" },
    },
  },
  {
    status: "WATCHED",
    movie: {
      connect: { apiId: 5 },
    },
    user: {
      connect: { clerkId: "user_1" },
    },
  },
];

async function main() {
  // const alice = await prisma.user.upsert({
  //   where: { email: "alice@prisma.io" },
  //   update: {},
  //   create: {
  //     email: "alice@prisma.io",
  //     name: "Alice",
  //     posts: {
  //       create: {
  //         title: "Check out Prisma with Next.js",
  //         content: "https://www.prisma.io/nextjs",
  //         published: true,
  //       },
  //     },
  //   },
  // });
  // const bob = await prisma.user.upsert({
  //   where: { email: "bob@prisma.io" },
  //   update: {},
  //   create: {
  //     email: "bob@prisma.io",
  //     name: "Bob",
  //     posts: {
  //       create: [
  //         {
  //           title: "Follow Prisma on Twitter",
  //           content: "https://twitter.com/prisma",
  //           published: true,
  //         },
  //         {
  //           title: "Follow Nexus on Twitter",
  //           content: "https://twitter.com/nexusgql",
  //           published: true,
  //         },
  //       ],
  //     },
  //   },
  // });
  // console.log({ alice, bob });

  console.log(`Start seeding ...`);

  for (const user of users) {
    await prisma.user.upsert({
      where: { clerkId: user.clerkId },
      update: {},
      create: user,
    });
  }

  for (const movie of movies) {
    await prisma.movie.upsert({
      where: { apiId: movie.apiId },
      update: {},
      create: movie,
    });
  }

  for (const userMovie of userMovies) {
    await prisma.userMovie.upsert({
      where: {
        userId_movieId: {
          userId: (
            await prisma.user.findUniqueOrThrow({
              where: { clerkId: userMovie.user.connect!.clerkId! },
            })
          ).id,
          movieId: (
            await prisma.movie.findUniqueOrThrow({
              where: { apiId: userMovie.movie.connect!.apiId! },
            })
          ).id,
        },
      },
      update: { status: userMovie.status },
      create: userMovie,
    });
  }

  console.log(`Seeding finished.`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
