import { Movie, MovieStatus } from "@prisma/client";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";

// needs to match enum MovieStatus defined in prisma schema.
const statusMappingToText = {
  TO_WATCH: "To Watch",
  WATCHING: "Watching",
  WAITING: "Waiting for Season",
  WATCHED: "Watched",
};

const statusMappingToColor = {
  TO_WATCH: "bg-blue-500",
  WATCHING: "bg-yellow-500",
  WAITING: "bg-purple-500",
  WATCHED: "bg-green-500",
};

type MovieCardProps = {
  status: MovieStatus;
  movie: Movie;
  onStatusChange: (movieId: string, newStatus: MovieStatus) => void;
  onRemove: (movieId: string) => void;
};

export default function MovieCard({
  status,
  movie,
  onStatusChange,
  onRemove,
}: MovieCardProps) {
  const posterImageURL = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <div
          className="group relative min-h-16 w-full overflow-hidden rounded-md shadow-md select-none"
          style={{
            backgroundImage: `url(${posterImageURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute right-2 bottom-2 left-2 text-lg font-semibold text-white">
            {movie.title}
          </div>

          {/* remove button */}
          <Button
            className="absolute top-3 right-3 min-h-0 opacity-0 group-hover:opacity-100 hover:cursor-pointer"
            variant="outline"
            onClick={() => onRemove(movie.id)}
          >
            Remove
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col gap-2">
          {Object.entries(statusMappingToText).map(([key, text]) => (
            <Button
              key={key}
              disabled={key === status}
              variant="outline"
              className="cursor-pointer justify-start hover:text-black"
              onClick={() => onStatusChange(movie.id, key as MovieStatus)}
            >
              <span
                className={`inline-block h-3 w-3 rounded-full ${
                  statusMappingToColor[key as keyof typeof statusMappingToColor]
                }`}
              ></span>
              {text}
            </Button>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
