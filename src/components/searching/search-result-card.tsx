import { MoviePreDB } from "@/types/movie";
import { Button } from "../ui/button";

type SearchResultCardProps = {
  movie: MoviePreDB;
};

// TODO: connect add button to store.

export default function SearchResultCard({ movie }: SearchResultCardProps) {
  const posterImageURL = `https://image.tmdb.org/t/p/w500${movie.backdrop_path ?? movie.poster_path}`;

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
        >
          +
        </Button>
      </div>
    </div>
  );
}
