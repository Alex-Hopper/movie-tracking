"use client";

import { Movie } from "@/types/movie";
import MovieColumn from "@/components/movie-column";
import { useState } from "react";

enum MovieStatus {
  TO_WATCH = "to-watch",
  WATCHING = "watching",
  WAITING = "waiting",
  WATCHED = "watched",
}

interface MovieItem {
  movie: Movie;
  status: MovieStatus;
}

export default function Home() {
  const [movies, setMovies] = useState<MovieItem[]>([
    {
      movie: {
        id: 1,
        title: "Inception",
        imagePath: "/vgnoBSVzWAV9sNQUORaDGvDp7wx.jpg",
      },
      status: MovieStatus.WATCHED,
    },
    {
      movie: {
        id: 2,
        title: "The Matrix",
        imagePath: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      },
      status: MovieStatus.WATCHING,
    },
    {
      movie: {
        id: 3,
        title: "Interstellar",
        imagePath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      },
      status: MovieStatus.TO_WATCH,
    },
    {
      movie: {
        id: 4,
        title: "The Dark Knight",
        imagePath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      },
      status: MovieStatus.WAITING,
    },
    {
      movie: {
        id: 5,
        title: "Pulp Fiction",
        imagePath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      },
      status: MovieStatus.WATCHED,
    },
    {
      movie: {
        id: 6,
        title: "Fight Club",
        imagePath: "/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
      },
      status: MovieStatus.TO_WATCH,
    },
    {
      movie: {
        id: 7,
        title: "Forrest Gump",
        imagePath: "/clolk7rB5lAjs41SD0Vt6IXYLMm.jpg",
      },
      status: MovieStatus.WATCHING,
    },
    {
      movie: {
        id: 8,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        imagePath: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
      },
      status: MovieStatus.WAITING,
    },
  ]);

  return (
    <div className="m-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <MovieColumn
        color="blue"
        status={MovieStatus.TO_WATCH}
        movies={movies.filter((item) => item.status === MovieStatus.TO_WATCH).map((item) => item.movie)}
      />
      <MovieColumn
        color="yellow"
        status={MovieStatus.WATCHING}
        movies={movies.filter((item) => item.status === MovieStatus.WATCHING).map((item) => item.movie)}
      />
      <MovieColumn
        color="purple"
        status={MovieStatus.WAITING}
        movies={movies.filter((item) => item.status === MovieStatus.WAITING).map((item) => item.movie)}
      />
      <MovieColumn
        color="green"
        status={MovieStatus.WATCHED}
        movies={movies.filter((item) => item.status === MovieStatus.WATCHED).map((item) => item.movie)}
      />
    </div>
  );
}
