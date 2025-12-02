<script lang="ts">
	import AnimeCard from './AnimeCard.svelte';

	interface AnimeItem {
		title: string;
		thumb: string;
		slug: string;
		episode: string;
		type: string;
		date?: string;
	}

	export let animeList: AnimeItem[] = [];
	export let currentPage: number = 1;
	const API_BASE_URL = 'https://rdapi.vercel.app/api/anime';

	async function loadOngoingAnime(page: number) {
		try {
			const response = await fetch(`${API_BASE_URL}/ongoing?page=${page}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log('API Response:', data);
			if (data.success && data.data) {
				animeList = data.data;
				currentPage = page;
				console.log('Anime list loaded:', animeList.length);
			}
		} catch (error) {
			console.error('Error loading anime:', error);
			animeList = [];
		}
	}

	function handlePrevPage() {
		if (currentPage > 1) {
			loadOngoingAnime(currentPage - 1);
		}
	}

	function handleNextPage() {
		loadOngoingAnime(currentPage + 1);
	}
</script>

<!-- Latest Updates Section -->
<div class="bixbox">
	<div class="releases home">
		<h2>Latest Updates</h2>
		<span class="v1">View All</span>
	</div>
	<div id="content-wrap">
		<div class="blog-posts hfeed item">
			{#each animeList as anime, index (anime.slug + index)}
				<AnimeCard {anime} />
			{/each}
		</div>
	</div>
</div>

<!-- Pagination -->
<div class="blog-pager container">
	<button class="blog-pager-older-link" on:click={handlePrevPage} disabled={currentPage === 1}>
		← Older Posts
	</button>
	<button class="blog-pager-newer-link" on:click={handleNextPage}> Newer Posts → </button>
</div>

<style>
	:global(.blog-pager) {
		width: 100%;
	}

	button {
		cursor: pointer;
		border: none;
		font-family: inherit;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
