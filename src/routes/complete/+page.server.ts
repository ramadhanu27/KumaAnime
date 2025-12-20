import type { PageServerLoad } from "./$types";
import { fetchWithTimeout } from "$lib/utils/fetchWithTimeout";

interface CompleteAnime {
  title: string;
  poster: string;
  episodes: number;
  score: string;
  lastReleaseDate: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

interface CompleteResponse {
  status: string;
  creator: string;
  statusCode: number;
  ok: boolean;
  data: {
    animeList: CompleteAnime[];
  };
  pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  };
}

export const load: PageServerLoad = async ({ url, fetch }) => {
  const page = url.searchParams.get("page") || "1";

  try {
    const response = await fetchWithTimeout(`https://www.sankavollerei.com/anime/complete-anime?page=${page}`, fetch);

    if (!response.ok) {
      console.error(`API error: ${response.status} - ${response.statusText}`);
      throw new Error(`API error: ${response.status}`);
    }

    const data: CompleteResponse = await response.json();

    if (!data.data) {
      throw new Error("Data tidak ditemukan");
    }

    return {
      animeList: data.data.animeList || [],
      currentPage: data.pagination?.currentPage || 1,
      totalPages: data.pagination?.totalPages || 1,
      hasNextPage: data.pagination?.hasNextPage || false,
      hasPrevPage: data.pagination?.hasPrevPage || false,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error memuat anime complete:", errorMessage, error);
    return {
      animeList: [],
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
      error: "Gagal memuat anime complete. Silakan coba lagi.",
    };
  }
};
