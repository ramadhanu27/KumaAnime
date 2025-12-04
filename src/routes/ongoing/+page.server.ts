import type { PageServerLoad } from "./$types";

interface Anime {
  title: string;
  slug: string;
  thumb: string;
  episode: string;
  type: string;
  date: string;
}

interface OngoingResponse {
  success: boolean;
  page: number;
  data: Anime[];
}

export const load: PageServerLoad = async ({ url, fetch }) => {
  const page = url.searchParams.get("page") || "1";

  try {
    const response = await fetch(`https://rdapi.vercel.app/api/anime/ongoing?page=${page}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: OngoingResponse = await response.json();

    return {
      animeList: data.data || [],
      currentPage: data.page || 1,
      error: null,
    };
  } catch (error) {
    console.error("Error memuat anime ongoing:", error);
    return {
      animeList: [],
      currentPage: 1,
      error: "Gagal memuat anime ongoing. Silakan coba lagi.",
    };
  }
};
