import type { PageServerLoad } from "./$types";

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
    const response = await fetch(`https://www.sankavollerei.com/anime/complete-anime?page=${page}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: CompleteResponse = await response.json();

    return {
      animeList: data.data?.animeList || [],
      currentPage: data.pagination?.currentPage || 1,
      totalPages: data.pagination?.totalPages || 1,
      hasNextPage: data.pagination?.hasNextPage || false,
      hasPrevPage: data.pagination?.hasPrevPage || false,
      error: null,
    };
  } catch (error) {
    console.error("Error memuat anime complete:", error);
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
