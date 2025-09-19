import { MoviePreDB } from "@/types/movie";
import { Button } from "../ui/button";
import { addUserMovie } from "@/actions/actions";
import { MovieStatus } from "@prisma/client";
import { useMoviesStore } from "@/store/movies-store";
import { toast } from "sonner";
import { Check } from "lucide-react";

type SearchResultCardProps = {
  movie: MoviePreDB;
};

export default function SearchResultCard({ movie }: SearchResultCardProps) {
  const { movies, setMovies, addMovie } = useMoviesStore();

  const posterImageURL = `https://image.tmdb.org/t/p/w500${movie.backdrop_path ?? movie.poster_path}`;

  let movieAdded = movies.some((m) => m.movie.apiId === movie.apiId);

  async function handleAddMovie() {
    const prevMovies = [...movies];

    if (movieAdded) {
      toast.error("Movie already added.");
      return;
    }

    movieAdded = true;
    addMovie({ movie, status: MovieStatus.TO_WATCH });

    try {
      await addUserMovie(movie.apiId, MovieStatus.TO_WATCH);
      toast.success(`Added ${movie.title} to your to watch list.`);
    } catch (error) {
      movieAdded = false;
      setMovies(prevMovies);
      toast.error(`Failed to add ${movie.title}. Please try again.`);
    }
  }

  return (
    <div className="flex items-stretch gap-x-1">
      <div
        className="group/card relative min-h-16 w-full overflow-hidden rounded-md border border-neutral-700 shadow-md"
        style={{
          backgroundImage: `url(${posterImageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

        <div className="relative px-4 py-2">
          <div className="line-clamp-2 max-h-16 text-lg font-semibold text-white transition-all duration-500 select-none group-hover/card:line-clamp-none group-hover/card:max-h-64">
            {movie.title}
          </div>
        </div>
      </div>

      {/* add button */}
      <div>
        <Button
          className="h-full w-8 align-middle hover:cursor-pointer"
          variant="outline"
          disabled={movieAdded}
          onClick={handleAddMovie}
        >
          {/* if already in add checkmark, otherwise + mark */}
          {movieAdded ? (
            <span className="text-green-500">
              <Check />
            </span>
          ) : (
            <span className="text-white">+</span>
          )}
        </Button>
      </div>
    </div>
  );
}
