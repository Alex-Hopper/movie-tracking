import { Movie, MovieStatus } from "@prisma/client";

export default function MovieCard({
  status,
  movie,
}: {
  status: MovieStatus;
  movie: Movie;
}) {
  // TODO: image card, with text above.
  // - on hover, add "move button or icon, use this to select new col or delete, or just hover, then add buttons beneath??"
  // - ^^ TOOLTIP probably easiest, with buttons
  const posterImageURL = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <div
      className="relative min-h-16 w-full overflow-hidden rounded-md shadow-md"
      style={{
        backgroundImage: `url(${posterImageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="text-md absolute right-2 bottom-2 left-2 font-semibold text-white">
        {movie.title}
      </div>

      {status === MovieStatus.WATCHED && (
        <div className="absolute top-2 right-2 rounded-full bg-green-600/80 p-1 text-xs font-bold text-white">
          Watched
        </div>
      )}
    </div>
  );
}
