"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { searchMovies } from "@/actions/searching";
import SearchResults from "./search-results";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const {
    isLoading,
    data: results,
    error,
  } = useQuery({
    queryKey: ["search-movies", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
    retry: false,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch search results. Please try again.");
    }
  }, [error]);

  return (
    <div className="relative w-full rounded-md bg-neutral-800">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className={`h-12 w-full rounded-t-md pl-10 focus:outline-none ${results ? "border-b-1 border-neutral-700" : ""}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="text-muted-foreground absolute left-3 h-4 w-4" />
      </div>
      {!isLoading && results?.length == 0 && (
        <p className="p-2 text-center text-sm text-neutral-400">
          No results found.
        </p>
      )}
      <SearchResults results={results} />
    </div>
  );
}
