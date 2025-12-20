import type { PageServerLoad } from "./$types";
import { fetchWithTimeout } from "$lib/utils/fetchWithTimeout";

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
    const response = await fetchWithTimeout(`https://www.sankavollerei.com/anime/search/${encodeURIComponent(query)}`);

    if (!response.ok) {
      console.error(`API error: ${response.status} - ${response.statusText}`);
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.data) {
      throw new Error("Data tidak ditemukan");
    }

    return {
      searchResults: data.data.animeList || [],
      searchQuery: query,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error searching anime:", errorMessage, error);
    return {
      searchResults: [],
      searchQuery: query,
      error: "Gagal mencari anime",
    };
  }
};
