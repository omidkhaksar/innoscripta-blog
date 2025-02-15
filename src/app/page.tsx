"use client";
import React, { useState, useEffect } from "react";
import NewsList from "@/components/NewsList";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import { fetchArticles } from "@/api/fetchArticles";
import { Article, Filters } from "@/types/types";
import { debounce } from "lodash";
import { useUserPreferences } from "@/hooks/useUserPreferences"; // Import the custom hook for preferences

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("apple"); // Default value set to 'apple'
  const [filters, setFilters] = useState<Filters>({
    category: "",
    from: "",
    to: "",
  });
  const [sources] = useState<string[]>(["nyt", "newsAPI", "theNews"]);
  const [selectedSources, setSelectedSources] = useState<string[]>([
    "nyt",
    "newsAPI",
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  // Use custom hook to manage user preferences
  const [preferences] = useUserPreferences();

  // Sync preferences with state on mount
  useEffect(() => {
    if (preferences.categories.length > 0) {
      setFilters((prev) => ({
        ...prev,
        category: preferences.categories[0], // Use the saved category
      }));
    }
    if (preferences.sources.length > 0) {
      setSelectedSources(preferences.sources); // Use saved sources
    }
    if (preferences.searchQuery) {
      setSearchQuery(preferences.searchQuery); // Use saved search query
    }
  }, [preferences]);

  const debouncedSearchQuery = debounce(async (query: string) => {
    setLoading(true);
    const filterParams = {
      category: filters.category,
      from: filters.from,
      to: filters.to,
    };
    const data = await fetchArticles(query, filterParams, {
      sources: selectedSources,
    });
    setArticles(data);
    setLoading(false);
  }, 500); // Debounce delay of 500ms

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    debouncedSearchQuery(searchQuery);
    // Cleanup function to cancel debounce on component unmount or when searchQuery changes
    return () => {
      debouncedSearchQuery.cancel();
    };
  }, [searchQuery, filters, selectedSources]);

  const handleSourceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSelectedSources((prevSources) =>
      e.target.checked
        ? [...prevSources, value]
        : prevSources.filter((source) => source !== value)
    );
  };
  return (
    <div className="px-5 py-2 flex flex-col gap-2 lg:flex-row">
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        sources={sources}
        selectedSources={selectedSources}
        onSourceChange={handleSourceChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="w-full lg:w-10/12">
        <NewsList articles={articles} isLoading={loading} />
      </div>
    </div>
  );
};

export default Home;
