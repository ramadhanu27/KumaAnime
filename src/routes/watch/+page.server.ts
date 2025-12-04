import type { PageServerLoad } from "./$types";

interface StreamingLink {
  source: string;
  url: string;
  quality: string;
}

interface DownloadLink {
  quality: string;
  host: string;
  url: string;
}

interface Episode {
  episode: string;
  title: string;
  slug: string;
  date: string;
  isCurrent: boolean;
}

interface CastMember {
  name: string;
  url: string;
}

interface EpisodeDetail {
  title: string;
  seriesName: string;
  alternativeTitle: string;
  thumb: string;
  rating: string;
  synopsis: string;
  episode: string;
  type: string;
  status: string;
  released: string;
  duration: string;
  season: string;
  studio: string;
  genres: string[];
  cast: CastMember[];
  streamingLinks: StreamingLink[];
  downloadLinks: DownloadLink[];
  episodeList: Episode[];
}

interface ApiResponse {
  success: boolean;
  data: EpisodeDetail;
}

export const load: PageServerLoad = async ({ url, fetch }) => {
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return {
      error: "Slug tidak ditemukan",
      episodeDetail: null,
    };
  }

  try {
    // Slug format dari API: "/one-piece-episode-1151-subtitle-indonesia/"
    // Hapus slash di awal dan akhir untuk digunakan di URL
    const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
    
    const response = await fetch(`https://rdapi.vercel.app/api/anime/detail/${cleanSlug}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: ApiResponse = await response.json();

    return {
      episodeDetail: data.data || null,
      error: null,
    };
  } catch (error) {
    console.error("Error memuat detail episode:", error);
    return {
      episodeDetail: null,
      error: "Gagal memuat detail episode. Silakan coba lagi.",
    };
  }
};
