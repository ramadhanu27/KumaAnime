import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

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
    const response = await fetch(`https://www.sankavollerei.com/anime/anime/${slug}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const result: ApiResponse = await response.json();

    return {
      animeDetail: result.data || null,
      slug: slug,
      error: null,
    };
  } catch (error) {
    console.error("Error memuat detail anime:", error);
    return {
      animeDetail: null,
      slug: slug,
      error: "Gagal memuat detail anime. Silakan coba lagi.",
    };
  }
};
