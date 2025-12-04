import type { PageServerLoad } from "./$types";

interface Anime {
  title: string;
  slug: string;
  thumb: string;
  type: string;
}

interface BrowseResponse {
  success: boolean;
  data: Anime[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export const load: PageServerLoad = async ({ url, fetch }) => {
  const genre = url.searchParams.get("genre") || "";
  const status = url.searchParams.get("status") || "";
  const page = url.searchParams.get("page") || "1";

  try {
    let apiUrl = `https://rdapi.vercel.app/api/anime/browse?`;
    const params = new URLSearchParams();

    if (genre) params.append("genre", genre);
    if (status) params.append("status", status);
    params.append("page", page);

    apiUrl += params.toString();

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: BrowseResponse = await response.json();

    return {
      animeList: data.data || [],
      pagination: data.pagination || {
        currentPage: parseInt(page),
        totalPages: 1,
        totalItems: 0,
      },
      filters: {
        genre,
        status,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error memuat anime list:", error);
    return {
      animeList: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
      },
      filters: {
        genre: "",
        status: "",
      },
      error: "Gagal memuat anime list. Silakan coba lagi.",
    };
  }
};
