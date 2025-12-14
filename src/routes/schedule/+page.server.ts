import type { PageServerLoad } from "./$types";

interface ScheduleAnime {
  title: string;
  slug: string;
  url: string;
  poster: string;
}

interface DaySchedule {
  day: string;
  anime_list: ScheduleAnime[];
}

interface ScheduleResponse {
  status: string;
  creator: string;
  data: DaySchedule[];
}

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch("https://www.sankavollerei.com/anime/schedule");
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: ScheduleResponse = await response.json();

    return {
      scheduleData: data.data || [],
      error: null,
    };
  } catch (error) {
    console.error("Error memuat jadwal anime:", error);
    return {
      scheduleData: [],
      error: "Gagal memuat jadwal anime. Silakan coba lagi.",
    };
  }
};
