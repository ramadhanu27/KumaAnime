import type { PageServerLoad } from "./$types";

interface SearchAnime {
  title: string;
  poster: string;
  status: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

interface ApiResponse {
  status: string;
  creator: string;
  statusCode: number;
  ok: boolean;
  data: {
    query: string;
    animeList: SearchAnime[];
  };
}

export const load: PageServerLoad = async ({ url, fetch }) => {
  const query = url.searchParams.get("q");

  if (!query) {
    return {
      searchResults: [],
      searchQuery: "",
      error: null,
    };
  }

  try {
    const response = await fetch(`https://www.sankavollerei.com/anime/search/${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: ApiResponse = await response.json();

    return {
      searchResults: data.data?.animeList || [],
      searchQuery: query,
      error: null,
    };
  } catch (error) {
    console.error("Error searching anime:", error);
    return {
      searchResults: [],
      searchQuery: query,
      error: "Gagal mencari anime",
    };
  }
};
