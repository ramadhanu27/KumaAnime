<script lang="ts">
	import AnimeCard from './AnimeCard.svelte';

	interface OngoingAnimeItem {
		title: string;
		poster: string;
		episodes: number | null;
		releaseDay: string;
		latestReleaseDate: string;
		animeId: string;
		href: string;
		otakudesuUrl: string;
	}

	interface CompletedAnimeItem {
		title: string;
		poster: string;
		episodes: number;
		score: string;
		lastReleaseDate: string;
		animeId: string;
		href: string;
		otakudesuUrl: string;
	}

	type AnimeItem = OngoingAnimeItem | CompletedAnimeItem;

	export let animeList: AnimeItem[] = [];
	export let sectionTitle: string = 'Latest Updates';
	export let viewAllHref: string = '';
	export let type: 'ongoing' | 'completed' = 'ongoing';
</script>

<section class="section">
	<div class="section-header">
		<h2>{sectionTitle}</h2>
		{#if viewAllHref}
			<a href={viewAllHref} class="view-all">
				View All
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		{/if}
	</div>
	<div class="grid">
		{#each animeList as anime, index (anime.animeId + index)}
			<AnimeCard {anime} {type} />
		{/each}
	</div>
</section>

<style>
	.section {
		margin-bottom: 40px;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		padding-bottom: 12px;
		border-bottom: 1px solid #27272a;
	}

	.section-header h2 {
		font-size: 18px;
		font-weight: 600;
		color: #f4f4f5;
		margin: 0;
	}

	.view-all {
		display: flex;
		align-items: center;
		gap: 4px;
		color: #71717a;
		text-decoration: none;
		font-size: 13px;
		font-weight: 500;
		transition: color 0.2s;
	}

	.view-all:hover {
		color: #facc15;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
		gap: 16px;
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
			gap: 12px;
		}

		.section-header h2 {
			font-size: 16px;
		}
	}

	@media (max-width: 480px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 10px;
		}
	}
</style>
