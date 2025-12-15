import type { PageServerLoad } from "./$types";

interface ServerItem {
  title: string;
  serverId: string;
  href: string;
}

interface QualityServer {
  title: string;
  serverList: ServerItem[];
}

interface DownloadUrl {
  title: string;
  url: string;
}

interface DownloadQuality {
  title: string;
  size: string;
  urls: DownloadUrl[];
}

interface Genre {
  title: string;
  genreId: string;
  href: string;
}

interface Episode {
  title: string;
  eps: number;
  date: string;
  episodeId: string;
  href: string;
}

interface NextPrevEpisode {
  title: string;
  episodeId: string;
  href: string;
}

interface EpisodeInfo {
  credit: string;
  encoder: string;
  duration: string;
  type: string;
  genreList: Genre[];
  episodeList: Episode[];
}

interface EpisodeData {
  title: string;
  animeId: string;
  releaseTime: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode: NextPrevEpisode | null;
  hasNextEpisode: boolean;
  nextEpisode: NextPrevEpisode | null;
  server: {
    qualities: QualityServer[];
  };
  downloadUrl: {
    qualities: DownloadQuality[];
  };
  info: EpisodeInfo;
}

interface ApiResponse {
  status: string;
  creator: string;
  statusCode: number;
  ok: boolean;
  data: EpisodeData;
}

export const load: PageServerLoad = async ({ params, fetch }) => {
  const slug = params.slug;

  if (!slug) {
    return {
      error: "Slug tidak ditemukan",
      episodeData: null,
      slug: null,
    };
  }

  try {
    const response = await fetch(`https://www.sankavollerei.com/anime/episode/${slug}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: ApiResponse = await response.json();

    return {
      episodeData: data.data || null,
      slug: slug,
      error: null,
    };
  } catch (error) {
    console.error("Error memuat detail episode:", error);
    return {
      episodeData: null,
      slug: slug,
      error: "Gagal memuat detail episode. Silakan coba lagi.",
    };
  }
};
