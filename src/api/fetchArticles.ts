import { fetchNewsAPI } from "./newsAPI";
import { fetchTheNews } from "./theNews";
import { fetchNYT } from "./nyt";
import type { Article , Filters , Preferences } from '@/types/types'

export const fetchArticles = async (
  query: string,
  filters: Filters,
  preferences: Preferences
): Promise<Article[]> => {
  const sources = preferences.sources.length > 0 ? preferences.sources : ["newsAPI", "theNews", "nyt"];
  const articles: Article[] = [];

  for (const source of sources) {
    try {
      switch (source) {
        case "newsAPI":
          articles.push(...(await fetchNewsAPI(query, filters)));
          break;
        case "theNews":
          articles.push(...(await fetchTheNews(query, filters)));
          break;
        case "nyt":
          articles.push(...(await fetchNYT(query, filters)));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error fetching from ${source}:`, error);
    }
  }

  return articles;
};
