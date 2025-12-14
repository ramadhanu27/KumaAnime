import type { PageServerLoad } from "./$types";

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
    const response = await fetch("https://www.sankavollerei.com/anime/home");
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const result: ApiResponse = await response.json();

    return {
      ongoingAnime: result.data?.ongoing?.animeList || [],
      completedAnime: result.data?.completed?.animeList || [],
      ongoingHref: result.data?.ongoing?.href || "",
      completedHref: result.data?.completed?.href || "",
    };
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return {
      ongoingAnime: [],
      completedAnime: [],
      ongoingHref: "",
      completedHref: "",
      error: "Gagal memuat data anime",
    };
  }
};
