import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { fetchArticles } from "@/api/fetchArticles";
import { Article, Filters } from "@/types/types";

export const useFetchArticles = (searchQuery: string, filters: Filters, selectedSources: string[]) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearchQuery = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      const filterParams = {
        category: filters.category,
        from: filters.from,
        to: filters.to,
      };
      const data = await fetchArticles(query, filterParams, { sources: selectedSources });
      setArticles(data);
      setLoading(false);
    }, 500),
    [filters, selectedSources] // Dependencies to trigger the debounce on change
  );

  useEffect(() => {
    debouncedSearchQuery(searchQuery);

    return () => {
      debouncedSearchQuery.cancel();
    };
  }, [searchQuery, debouncedSearchQuery]);

  return { articles, loading };
};
