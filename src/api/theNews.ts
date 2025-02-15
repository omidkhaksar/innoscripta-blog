import axios from "axios";
import { API_URLS, API_KEYS } from "@/constants/constants";
import { buildQueryParams } from "@/utils/buildQueryParams";
import type { Article , Filters , TheNewsResponse  } from '@/types/types';



export const fetchTheNews = async (
  query: string,
  filters: Filters
): Promise<Article[]> => {
  const API_KEY = API_KEYS.theNews;
  const BASE_URL = API_URLS.theNews;

  try {
    const baseParams = {
      search: query,
      api_token: API_KEY,
      sortBy: "publishedAt",
      language: "en",
    };

    const filterParams = {
      section: filters.category || undefined,
      "from-date": filters.from  || undefined,
      "to-date": filters.to  || undefined,
    };

    const cleanFilterParams = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(filterParams).filter(([key, value]) => value !== undefined && value !== '')
    )  
    
    const queryString = buildQueryParams({ ...baseParams, ...cleanFilterParams })
    const response = await axios.get<TheNewsResponse>(`${BASE_URL}?${queryString}`);

    return response.data.data.map((item) => ({
      source: { id: null, name: item.source , api :'TheNews'  },
      author: item.author || "Unknown",
      title: item.title,
      description: item.description || "No description available",
      url: item.url,
      urlToImage: item.image_url || "",
      publishedAt: item.published_at || item.date || "Unknown date",
      content: item.content || "No content available",
    }));
  } catch (error) {
    console.error("Error fetching from TheNewsAPI:", error);
    return [];
  }
};
