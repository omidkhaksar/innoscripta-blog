import axios from "axios";
import { API_URLS, API_KEYS } from "@/constants/constants";
import { buildQueryParams } from "@/utils/buildQueryParams";
import type { Article , Filters } from '@/types/types';


interface NewsAPIResponse {
  articles: Article[];
}

export const fetchNewsAPI = async (
  query: string,
  filters: Filters
): Promise<Article[]> => {
  const API_KEY = API_KEYS.newsAPI;
  const BASE_URL = API_URLS.newsAPI;

  try {
    const baseParams = {
      q: query,
      apiKey: API_KEY,
      sortBy: "publishedAt",
      language: "en",
    };

    const filterParams = {
      category: filters.category || undefined,  // If category is empty, set it to undefined
      from: filters.from || undefined,
      to: filters.to || undefined,
    }

    const cleanFilterParams = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(filterParams).filter(([key, value]) => value !== undefined && value !== '')
    )    
    const queryString = buildQueryParams({ ...baseParams, ...cleanFilterParams })

    const response = await axios.get<NewsAPIResponse>(`${BASE_URL}?${queryString}`);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return [];
  }
};
