import type { PageServerLoad } from "./$types";
import { fetchWithTimeout } from "$lib/utils/fetchWithTimeout";

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
    const response = await fetchWithTimeout(`https://www.sankavollerei.com/anime/episode/${slug}`);

    if (!response.ok) {
      console.error(`API error: ${response.status} - ${response.statusText}`);
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.data) {
      throw new Error("Data episode tidak ditemukan");
    }

    return {
      episodeData: data.data,
      slug: slug,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error memuat detail episode:", errorMessage, error);
    return {
      episodeData: null,
      slug: slug,
      error: "Gagal memuat detail episode. Silakan coba lagi.",
    };
  }
};
