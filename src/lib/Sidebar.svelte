<script lang="ts">
	import { onMount } from 'svelte';

	interface AnimeItem {
		title: string;
		thumb: string;
		slug: string;
		rating: string;
		genres: string[];
	}

	interface Genre {
		title: string;
		genreId: string;
		href: string;
	}

	let popularAnime: AnimeItem[] = [];
	let genres: Genre[] = [];

	onMount(() => {
		loadPopularAnime();
		loadGenres();
	});

	async function loadPopularAnime() {
		try {
			const response = await fetch('https://rdapi.vercel.app/api/anime/popular?period=all');
			const data = await response.json();
			if (data.success && data.data) {
				popularAnime = data.data.slice(0, 10).map((anime: any) => ({
					title: anime.title,
					thumb: anime.thumb,
					slug: anime.slug.replace(/\//g, ''),
					rating: anime.rating || '0',
					genres: anime.genres || []
				}));
			}
		} catch (error) {
			console.error('Error loading popular anime:', error);
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
	<!-- Popular Anime -->
	<div class="widget">
		<h3 class="widget-title">Popular</h3>
		<div class="popular-list">
			{#each popularAnime as anime, index (anime.slug)}
				<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`} class="popular-item">
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
						<span class="genres">{anime.genres?.slice(0, 2).join(', ') || '-'}</span>
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

	.genres {
		font-size: 11px;
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
