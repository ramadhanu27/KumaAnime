import type { PageServerLoad } from "./$types";

interface AnimeItem {
  title: string;
  poster: string;
  studios: string;
  score: string;
  episodes: number | null;
  season: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
  synopsis: {
    paragraphs: string[];
  };
  genreList: {
    title: string;
    genreId: string;
    href: string;
    otakudesuUrl: string;
  }[];
}

interface ApiResponse {
  status: string;
  ok: boolean;
  data: {
    animeList: AnimeItem[];
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

export const load: PageServerLoad = async ({ url }) => {
  const genre = url.searchParams.get("genre") || "action";
  const page = url.searchParams.get("page") || "1";

  try {
    const response = await fetch(`https://www.sankavollerei.com/anime/genre/${genre}?page=${page}`);

    if (!response.ok) {
      throw new Error("Failed to fetch anime list");
    }

    const data: ApiResponse = await response.json();

    if (!data.ok || !data.data?.animeList) {
      throw new Error("Invalid API response");
    }

    return {
      animeList: data.data.animeList,
      pagination: data.pagination,
      filters: {
        genre,
        page: parseInt(page),
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching anime list:", error);
    return {
      animeList: [],
      pagination: {
        currentPage: 1,
        hasPrevPage: false,
        prevPage: null,
        hasNextPage: false,
        nextPage: null,
        totalPages: 1,
      },
      filters: {
        genre,
        page: parseInt(page),
      },
      error: "Gagal memuat daftar anime. Silakan coba lagi.",
    };
  }
};
