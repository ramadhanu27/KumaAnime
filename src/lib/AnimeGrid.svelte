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

<!-- Anime Section -->
<div class="bixbox">
	<div class="releases home">
		<h2>{sectionTitle}</h2>
		{#if viewAllHref}
			<a href={viewAllHref} class="v1">View All</a>
		{/if}
	</div>
	<div id="content-wrap">
		<div class="blog-posts hfeed item">
			{#each animeList as anime, index (anime.animeId + index)}
				<AnimeCard {anime} {type} />
			{/each}
		</div>
	</div>
</div>

<style>
	.bixbox {
		margin-bottom: 32px;
	}

	.releases {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		padding-bottom: 12px;
		border-bottom: 2px solid rgba(99, 102, 241, 0.3);
	}

	.releases h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #f8fafc;
		margin: 0;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.v1 {
		color: #818cf8;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		padding: 8px 16px;
		background: rgba(99, 102, 241, 0.1);
		border-radius: 20px;
		transition: all 0.3s ease;
	}

	.v1:hover {
		background: rgba(99, 102, 241, 0.2);
		color: #a5b4fc;
		transform: translateX(3px);
	}

	#content-wrap {
		width: 100%;
	}

	.blog-posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 20px;
	}

	@media (max-width: 768px) {
		.blog-posts {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 12px;
		}

		.releases h2 {
			font-size: 1.2rem;
		}
	}

	@media (max-width: 480px) {
		.blog-posts {
			grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
			gap: 10px;
		}
	}
</style>

