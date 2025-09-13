"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { searchMovies } from "@/actions/actions";
import SearchResults from "./search-results";
import { Search } from "lucide-react";
// toast
import { toast } from "sonner";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    async function fetchResults() {
      const res = await searchMovies(debouncedQuery);
      setResults(res);
    }

    try {
      fetchResults();
    } catch (error) {
      toast.error("Failed to fetch search results. Please try again. " + error);
    }
  }, [debouncedQuery]);

  return (
    <div className="relative w-full rounded-md bg-neutral-800">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className={`h-12 w-full rounded-t-md pl-10 focus:outline-none ${results.length > 0 ? "border-b-1 border-neutral-700" : ""}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="text-muted-foreground absolute left-3 h-4 w-4" />
      </div>
      <SearchResults results={results} />
    </div>
  );
}
