import axios from "axios"
import { API_URLS, API_KEYS } from "@/constants/constants"
import { buildQueryParams } from "@/utils/buildQueryParams"
import type { Article , Filters  } from '@/types/types';


export const fetchNYT = async (
  query: string,
  filters: Filters
): Promise<Article[]> => {
  const API_KEY = API_KEYS.nyt;
  const BASE_URL = API_URLS.nyt;

  try {
    const baseParams = { q: query, "api-key": API_KEY };
    const filterParams = {
      "fq=news_desk": filters.category || undefined,
      begin_date: filters.from || undefined,
      end_date: filters.to || undefined,
    };

    const cleanFilterParams = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(filterParams).filter(([key, value]) => value !== undefined && value !== '')
    )  
    
    const queryString = buildQueryParams({ ...baseParams, ...cleanFilterParams })
    const response = await axios.get(`${BASE_URL}?${queryString}`);

    return response.data.response.docs.map((doc:any) => ({
      source: { id: null, name: doc?.source , api :'NYT' },
      author: `${doc?.byline?.person?.[0]?.firstname || ""} ${
        doc?.byline?.person?.[0]?.lastname || "Unknown"
      }`.trim(),
      title: doc?.headline?.main || "No title available",
      description: doc?.snippet || "No description available",
      url: doc?.web_url,
      urlToImage: doc.multimedia?.[0]?.url
        ? `https://www.nytimes.com/${doc.multimedia[0].url}`
        : "",
      publishedAt: doc?.pub_date,
      content: doc?.abstract || "No content available",
    }));
  } catch (error) {
    console.error("Error fetching from NYT:", error);
    return [];
  }
};