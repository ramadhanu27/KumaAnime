import type { PageServerLoad } from "./$types";

interface Genre {
  title: string;
  genreId: string;
  href: string;
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

interface DownloadFormat {
  title: string;
  qualities: DownloadQuality[];
}

interface BatchData {
  title: string;
  animeId: string;
  poster: string;
  japanese: string;
  type: string;
  score: string;
  episodes: number;
  duration: string;
  studios: string;
  producers: string;
  aired: string;
  credit: string;
  genreList: Genre[];
  downloadUrl: {
    formats: DownloadFormat[];
  };
}

interface ApiResponse {
  status: string;
  creator: string;
  statusCode: number;
  ok: boolean;
  data: BatchData;
}

export const load: PageServerLoad = async ({ url, fetch }) => {
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return {
      error: "Slug tidak ditemukan",
      batchData: null,
    };
  }

  try {
    const response = await fetch(`https://www.sankavollerei.com/anime/batch/${slug}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: ApiResponse = await response.json();

    return {
      batchData: data.data || null,
      error: null,
    };
  } catch (error) {
    console.error("Error memuat batch download:", error);
    return {
      batchData: null,
      error: "Gagal memuat batch download. Silakan coba lagi.",
    };
  }
};
