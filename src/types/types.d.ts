  export interface Filters {
    category?: string;
    sources?: string;
    from?: string;
    to?: string;
  }
  
  export interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }


  export interface NYTDoc {
    source?: string;
    byline?: { person?: { firstname?: string; lastname?: string }[] };
    headline?: { main: string };
    snippet?: string;
    web_url: string;
    multimedia?: { url?: string }[];
    pub_date: string;
    abstract?: string;
  }
  
  export interface NYTResponse {
    response: { docs: NYTDoc[] };
  }

  export interface TheNewsItem {
    source: string;
    author?: string;
    title: string;
    description?: string;
    url: string;
    image_url?: string;
    published_at?: string;
    date?: string;
    content?: string;
  }
  
  export interface TheNewsResponse {
    data: TheNewsItem[];
  }
  
  export interface NewsListProps {
    articles: Article[];
    isLoading: boolean; // New prop to handle loading state
    itemsPerPage?: number; // Optional items per page prop
  }
  
  export interface Preferences {
    sources: string[];
  }

  export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

  export interface FilterPanelProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    sources: string[];
    selectedSources: string[];
    onSourceChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      value: string
    ) => void;
    searchQuery: string; // Add searchQuery as a prop
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // Add setSearchQuery as a prop
  }