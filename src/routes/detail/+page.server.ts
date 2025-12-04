import type { PageServerLoad } from "./$types";

interface Episode {
  episode: string;
  title: string;
  slug: string;
  date: string;
  url?: string;
}

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

interface CastMember {
  name: string;
  url: string;
}

interface AnimeDetail {
  title: string;
  alternativeTitle: string;
  thumb: string;
  rating: string;
  synopsis: string;
  type: string;
  status: string;
  released: string;
  duration: string;
  season: string;
  studio: string;
  genres: string[];
  cast: CastMember[];
  totalEpisodes: number;
  episodes: Episode[];
  producers?: string;
  director?: string;
  releasedOn?: string;
  updatedOn?: string;
}

interface ApiResponse {
  success: boolean;
  data: AnimeDetail;
}

export const load: PageServerLoad = async ({ url, fetch }) => {
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return {
      error: "Slug tidak ditemukan",
      animeDetail: null,
    };
  }

  // Deteksi jika slug adalah episode (mengandung "episode")
  if (slug.toLowerCase().includes('episode')) {
    // Redirect ke watch page untuk episode
    return {
      redirect: `/watch?slug=${encodeURIComponent(slug)}`,
    };
  }

  try {
    // Slug sudah dalam format yang benar dari sidebar (contoh: "animeone-piece")
    // Gunakan langsung sebagai parameter API
    const response = await fetch(`https://rdapi.vercel.app/api/anime/series/anime/${slug.replace('anime', '')}/`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: ApiResponse = await response.json();

    // Map episodes ke episodeList untuk kompatibilitas template
    const animeDetail = data.data;
    if (animeDetail && animeDetail.episodes) {
      (animeDetail as any).episodeList = animeDetail.episodes;
    }

    return {
      animeDetail: animeDetail || null,
      error: null,
    };
  } catch (error) {
    console.error("Error memuat detail anime:", error);
    return {
      animeDetail: null,
      error: "Gagal memuat detail anime. Silakan coba lagi.",
    };
  }
};
