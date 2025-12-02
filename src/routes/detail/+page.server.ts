import type { PageServerLoad } from "./$types";

interface Episode {
  episode: string;
  title: string;
  slug: string;
  date: string;
  isCurrent: boolean;
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
  relatedEpisodes: unknown[];
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

  try {
    const response = await fetch(`https://rdapi.vercel.app/api/anime/detail${slug}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: ApiResponse = await response.json();

    return {
      animeDetail: data.data || null,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching anime detail:", error);
    return {
      animeDetail: null,
      error: "Gagal memuat detail anime",
    };
  }
};
