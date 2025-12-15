<script lang="ts">
	import { onMount } from 'svelte';

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

	interface AnimeItem {
		title: string;
		thumb: string;
		slug: string;
		score: string;
		episodes: number;
	}

	interface Genre {
		title: string;
		genreId: string;
		href: string;
	}

	let popularAnime: AnimeItem[] = [];
	let genres: Genre[] = [];

	onMount(() => {
		loadCompletedAnime();
		loadGenres();
	});

	async function loadCompletedAnime() {
		try {
			const response = await fetch('https://www.sankavollerei.com/anime/home');
			const data = await response.json();
			if (data.ok && data.data?.completed?.animeList) {
				popularAnime = data.data.completed.animeList.slice(0, 10).map((anime: CompletedAnimeItem) => ({
					title: anime.title,
					thumb: anime.poster,
					slug: anime.animeId,
					score: anime.score || '-',
					episodes: anime.episodes || 0
				}));
			}
		} catch (error) {
			console.error('Error loading completed anime:', error);
		}
	}

	async function loadGenres() {
		try {
			const response = await fetch('https://www.sankavollerei.com/anime/genre');
			const data = await response.json();
			if (data.ok && data.data?.genreList) {
				genres = data.data.genreList;
			}
		} catch (error) {
			console.error('Error loading genres:', error);
		}
	}
</script>

<aside class="sidebar">
	<!-- Completed Anime -->
	<div class="widget">
		<h3 class="widget-title">Completed</h3>
		<div class="popular-list">
			{#each popularAnime as anime, index (anime.slug)}
				<a href={`/detail/${encodeURIComponent(anime.slug)}`} class="popular-item">
					<span class="rank" class:top={index < 3}>{index + 1}</span>
					<img
						src={anime.thumb}
						alt={anime.title}
						on:error={(e) => {
							(e.currentTarget as HTMLImageElement).src =
								'https://via.placeholder.com/60x80/18181b/52525b?text=N';
						}}
					/>
					<div class="item-info">
						<h4>{anime.title}</h4>
						<span class="meta-info">
							{#if anime.score && anime.score !== '-'}
								<span class="score">⭐ {anime.score}</span>
							{/if}
							{#if anime.episodes}
								<span class="eps">{anime.episodes} Eps</span>
							{/if}
						</span>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- Genres -->
	<div class="widget">
		<h3 class="widget-title">Genre</h3>
		<div class="genre-list">
			{#each genres as genre (genre.genreId)}
				<a href={`/genre?slug=${genre.genreId}`} class="genre-tag">
					{genre.title}
				</a>
			{/each}
		</div>
	</div>
</aside>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.widget {
		background: #18181b;
		border-radius: 8px;
		overflow: hidden;
	}

	.widget-title {
		font-size: 14px;
		font-weight: 600;
		color: #f4f4f5;
		padding: 14px 16px;
		margin: 0;
		border-bottom: 1px solid #27272a;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Popular List */
	.popular-list {
		padding: 8px 0;
	}

	.popular-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 16px;
		text-decoration: none;
		transition: background 0.2s;
	}

	.popular-item:hover {
		background: #27272a;
	}

	.rank {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 600;
		color: #71717a;
		background: #27272a;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.rank.top {
		background: #facc15;
		color: #0f0f0f;
	}

	.popular-item img {
		width: 44px;
		height: 60px;
		object-fit: cover;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.item-info {
		flex: 1;
		min-width: 0;
	}

	.item-info h4 {
		font-size: 13px;
		font-weight: 500;
		color: #e4e4e7;
		margin: 0 0 4px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.4;
	}

	.popular-item:hover .item-info h4 {
		color: #facc15;
	}

	.meta-info {
		display: flex;
		gap: 8px;
		font-size: 11px;
	}

	.score {
		color: #facc15;
	}

	.eps {
		color: #52525b;
	}

	/* Genre List */
	.genre-list {
		padding: 12px;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		max-height: 300px;
		overflow-y: auto;
	}

	.genre-list::-webkit-scrollbar {
		width: 4px;
	}

	.genre-list::-webkit-scrollbar-track {
		background: transparent;
	}

	.genre-list::-webkit-scrollbar-thumb {
		background: #3f3f46;
		border-radius: 4px;
	}

	.genre-tag {
		padding: 5px 10px;
		font-size: 11px;
		color: #a1a1aa;
		background: #27272a;
		border-radius: 4px;
		text-decoration: none;
		transition: all 0.2s;
	}

	.genre-tag:hover {
		background: #3f3f46;
		color: #f4f4f5;
	}

	@media (max-width: 1024px) {
		.widget {
			border-radius: 6px;
		}
	}
</style>
