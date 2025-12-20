import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { fetchWithTimeout } from "$lib/utils/fetchWithTimeout";

interface Genre {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
}

interface Episode {
  title: string;
  eps: number;
  date: string;
  episodeId: string;
  href: string;
  otakudesuUrl: string;
}

interface Batch {
  title: string;
  batchId: string;
  href: string;
  otakudesuUrl: string;
}

interface Connection {
  title: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

interface Synopsis {
  paragraphs: string[];
  connections: Connection[];
}

interface RecommendedAnime {
  title: string;
  poster: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

interface AnimeDetail {
  title: string;
  poster: string;
  japanese: string;
  score: string;
  producers: string;
  type: string;
  status: string;
  episodes: number;
  duration: string;
  aired: string;
  studios: string;
  batch: Batch | null;
  synopsis: Synopsis;
  genreList: Genre[];
  episodeList: Episode[];
  recommendedAnimeList: RecommendedAnime[];
}

interface ApiResponse {
  status: string;
  creator: string;
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: AnimeDetail;
  pagination: null;
}

export const load: PageServerLoad = async ({ params, fetch }) => {
  const slug = params.slug;

  if (!slug) {
    return {
      error: "Slug tidak ditemukan",
      animeDetail: null,
    };
  }

  // Deteksi jika slug adalah episode (mengandung "episode")
  if (slug.toLowerCase().includes("episode")) {
    // Redirect ke watch page untuk episode
    throw redirect(307, `/watch/${encodeURIComponent(slug)}`);
  }

  try {
    const response = await fetchWithTimeout(`https://www.sankavollerei.com/anime/anime/${slug}`, fetch);

    if (!response.ok) {
      console.error(`API error: ${response.status} - ${response.statusText}`);
      throw new Error(`API error: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (!result.data) {
      throw new Error("Data anime tidak ditemukan");
    }

    return {
      animeDetail: result.data,
      slug: slug,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error memuat detail anime:", errorMessage, error);

    let userMessage = "Gagal memuat detail anime. Silakan coba lagi.";
    if (errorMessage.includes("abort")) {
      userMessage = "Request timeout. Silakan coba lagi.";
    } else if (errorMessage.includes("fetch")) {
      userMessage = "Gagal terhubung ke server. Silakan coba lagi.";
    }

    return {
      animeDetail: null,
      slug: slug,
      error: userMessage,
    };
  }
};
