import { MovieSearchResult } from "@/types/movie";
import SearchResultCard from "./search-result-card";

type SearchResultsProps = {
  results: MovieSearchResult[];
};

export default function SearchResults({ results }: SearchResultsProps) {
  return results.length > 0 ? (
    <div className="space-y-2 p-3">
      <p className="text-sm text-neutral-400">Search results</p>
      <div className="space-y-4">
        {results.map((movie, index) => (
          <SearchResultCard key={movie.apiId ?? index} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}
