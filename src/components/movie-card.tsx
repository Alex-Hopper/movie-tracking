import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  // TODO: image card, with text above.
  // - on hover, add "move button or icon, use this to select new col or delete, or just hover, then add buttons beneath??"
  // - ^^ TOOLTIP probably easiest, with buttons
  const posterImageURL = `https://image.tmdb.org/t/p/w500${movie.imagePath}`;

  return (
    <div
      className="relative w-full min-h-16 rounded-md overflow-hidden shadow-md"
      style={{
        backgroundImage: `url(${posterImageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute bottom-2 left-2 right-2 text-white text-md font-semibold">
        {movie.title}
      </div>
    </div>
  );
}
