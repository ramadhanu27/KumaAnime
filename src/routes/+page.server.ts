import type { PageServerLoad } from './$types';

interface AnimeItem {
	title: string;
	thumb: string;
	slug: string;
	episode: string;
	type: string;
	date?: string;
}

interface ApiResponse {
	success: boolean;
	page: number;
	data: AnimeItem[];
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('https://rdapi.vercel.app/api/anime/ongoing?page=1');
		if (!response.ok) {
			throw new Error(`API error: ${response.status}`);
		}
		const data: ApiResponse = await response.json();
		
		return {
			animeData: data.data || [],
			currentPage: data.page || 1
		};
	} catch (error) {
		console.error('Error fetching anime data:', error);
		return {
			animeData: [],
			currentPage: 1,
			error: 'Gagal memuat data anime'
		};
	}
};
