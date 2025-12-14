import type { PageServerLoad } from "./$types";

interface AnimeItem {
  title: string;
  poster: string;
  animeId: string;
  episode: string;
  releaseDay: string;
  href: string;
}

interface GenreData {
  title: string;
  animeList: AnimeItem[];
}

interface PaginationData {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
}

export const load: PageServerLoad = async ({ url }) => {
  const slug = url.searchParams.get("slug");
  const page = url.searchParams.get("page") || "1";

  if (!slug) {
    return {
      error: "Genre tidak ditemukan",
      genreData: null,
      pagination: null,
    };
  }

  try {
    const response = await fetch(`https://www.sankavollerei.com/anime/genre/${slug}?page=${page}`);
    const data = await response.json();

    if (!data.ok) {
      return {
        error: "Gagal memuat data genre",
        genreData: null,
        pagination: null,
      };
    }

    return {
      genreData: data.data as GenreData,
      pagination: data.pagination as PaginationData,
      currentSlug: slug,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching genre data:", error);
    return {
      error: "Terjadi kesalahan saat memuat data",
      genreData: null,
      pagination: null,
    };
  }
};
