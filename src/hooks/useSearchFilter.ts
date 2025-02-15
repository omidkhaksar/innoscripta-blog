import { useState, useEffect } from "react";
import { fetchArticles } from "../api/fetchArticles";
import { Article , Filters , Preferences } from "@/types/types"; // Assuming Article type is defined in your types

export const useSearchFilter = (
  query: string,
  filters: Filters,
  preferences: Preferences
): Article[] => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchFilteredArticles = async () => {
      const fetchedArticles = await fetchArticles(query, filters, preferences);
      setArticles(fetchedArticles);
    };
    fetchFilteredArticles();
  }, [query, filters, preferences]);

  return articles;
};
