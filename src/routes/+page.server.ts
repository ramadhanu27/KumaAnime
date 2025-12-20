import type { PageServerLoad } from "./$types";
import { fetchWithTimeout } from "$lib/utils/fetchWithTimeout";

interface OngoingAnimeItem {
  title: string;
  poster: string;
  episodes: number | null;
  releaseDay: string;
  latestReleaseDate: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

interface CompletedAnimeItem {
  title: string;
  poster: string;
  episodes: number;
  score: string;
  lastReleaseDate: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

interface OngoingData {
  href: string;
  otakudesuUrl: string;
  animeList: OngoingAnimeItem[];
}

interface CompletedData {
  href: string;
  otakudesuUrl: string;
  animeList: CompletedAnimeItem[];
}

interface ApiResponse {
  status: string;
  creator: string;
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    ongoing: OngoingData;
    completed: CompletedData;
  };
  pagination: null;
}

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetchWithTimeout("https://www.sankavollerei.com/anime/home");

    if (!response.ok) {
      console.error(`API error: ${response.status} - ${response.statusText}`);
      throw new Error(`API error: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (!result.data) {
      throw new Error("Data tidak ditemukan");
    }

    return {
      ongoingAnime: result.data.ongoing?.animeList || [],
      completedAnime: result.data.completed?.animeList || [],
      ongoingHref: result.data.ongoing?.href || "",
      completedHref: result.data.completed?.href || "",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching anime data:", errorMessage, error);

    return {
      ongoingAnime: [],
      completedAnime: [],
      ongoingHref: "",
      completedHref: "",
      error: "Gagal memuat data anime",
    };
  }
};
