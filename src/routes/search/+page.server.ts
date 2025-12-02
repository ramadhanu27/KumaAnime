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
	data: AnimeItem[];
}

export const load: PageServerLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('q');

	if (!query) {
		return {
			searchResults: [],
			searchQuery: '',
			error: null
		};
	}

	try {
		const response = await fetch(`https://rdapi.vercel.app/api/anime/search?q=${encodeURIComponent(query)}`);
		if (!response.ok) {
			throw new Error(`API error: ${response.status}`);
		}
		const data: ApiResponse = await response.json();

		return {
			searchResults: data.data || [],
			searchQuery: query,
			error: null
		};
	} catch (error) {
		console.error('Error searching anime:', error);
		return {
			searchResults: [],
			searchQuery: query,
			error: 'Gagal mencari anime'
		};
	}
};
