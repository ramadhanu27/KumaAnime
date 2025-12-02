<script lang="ts">
	import { onMount } from 'svelte';

	interface AnimeItem {
		title: string;
		thumb: string;
		slug: string;
		rating: string;
	}

	interface Genre {
		name: string;
		slug: string;
		url: string;
	}

	let popularAnime: AnimeItem[] = [];
	let genres: Genre[] = [];
	const API_BASE_URL = 'https://rdapi.up.railway.app/api/anime';

	onMount(() => {
		loadPopularAnime();
		loadGenres();
	});

	async function loadPopularAnime() {
		try {
			const response = await fetch(`${API_BASE_URL}/complete?page=1`);
			const data = await response.json();
			if (data.success && data.data) {
				popularAnime = data.data.slice(0, 5);
			}
		} catch (error) {
			console.error('Error loading popular anime:', error);
		}
	}

	async function loadGenres() {
		try {
			const response = await fetch('https://rdapi.vercel.app/api/anime/genres');
			const data = await response.json();
			if (data.success && data.data) {
				genres = data.data;
			}
		} catch (error) {
			console.error('Error loading genres:', error);
		}
	}
</script>

<div id="widget-kanan">
	<div id="sticky-sidebar">
		<!-- Popular Posts -->
		<div class="sidebar">
			<div class="widget popular-widget" id="re-spoiler">
				<h2 class="judul-pop">Anime Popular</h2>
				<div class="popular-list">
					{#each popularAnime as anime, index (anime.slug)}
						<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`} class="popular-item" class:featured={index === 0}>
							<div class="popular-image">
								<img
									src={anime.thumb}
									alt={anime.title}
									on:error={(e) => {
										(e.currentTarget as HTMLImageElement).src =
											'https://via.placeholder.com/300x400/0c70de/ffffff?text=No+Image';
									}}
								/>
								{#if index > 0}
									<span class="popular-number">{index + 1}</span>
								{/if}
							</div>
							<div class="popular-content">
								<h3 class="popular-title">{anime.title}</h3>
								<div class="popular-meta">
									<span class="type-badge">TV</span>
									<span class="rating">★ {anime.rating}</span>
								</div>
								<p class="popular-genres">Action, Adventure, Fantasy</p>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- Genres Widget -->
		<div class="sidebar">
			<div class="widget genres-widget" id="genrehent">
				<h3 class="title">Genre</h3>
				<div class="widget-content genres-grid">
					{#each genres as genre (genre.slug)}
						<a href={`/genre${genre.slug}`} class="genre-item">
							<span class="genre-name">{genre.name}</span>
							<span class="genre-count">{Math.floor(Math.random() * 20) + 1}</span>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(#widget-kanan) {
		width: 100%;
	}

	/* Popular Widget Styling */
	:global(.popular-widget) {
		background: #fff !important;
		padding: 0 !important;
	}

	:global(.popular-widget .judul-pop) {
		color: #333 !important;
		font-size: 16px !important;
		font-weight: 600 !important;
		padding: 15px 15px 10px 15px !important;
		margin: 0 !important;
		border-bottom: 1px solid #e0e0e0 !important;
	}

	:global(.popular-list) {
		display: flex !important;
		flex-direction: column !important;
		gap: 0 !important;
	}

	:global(.popular-item) {
		display: flex !important;
		gap: 12px !important;
		padding: 12px 15px !important;
		border-bottom: 1px solid #e0e0e0 !important;
		text-decoration: none !important;
		transition: all 0.3s ease !important;
		position: relative !important;
	}

	:global(.popular-item:hover) {
		background: #f5f5f5 !important;
	}

	:global(.popular-item.featured) {
		flex-direction: column !important;
		padding: 0 !important;
		border-bottom: 1px solid #e0e0e0 !important;
	}

	:global(.popular-item.featured .popular-image) {
		width: 100% !important;
		height: 200px !important;
		margin-bottom: 12px !important;
	}

	:global(.popular-item.featured .popular-content) {
		padding: 12px 15px !important;
	}

	:global(.popular-image) {
		position: relative !important;
		width: 60px !important;
		height: 80px !important;
		flex-shrink: 0 !important;
		border-radius: 4px !important;
		overflow: hidden !important;
	}

	:global(.popular-image img) {
		width: 100% !important;
		height: 100% !important;
		object-fit: cover !important;
	}

	:global(.popular-number) {
		position: absolute !important;
		bottom: 4px !important;
		left: 4px !important;
		background: #e91e63 !important;
		color: #fff !important;
		width: 24px !important;
		height: 24px !important;
		border-radius: 50% !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		font-size: 12px !important;
		font-weight: 600 !important;
	}

	:global(.popular-content) {
		flex: 1 !important;
		display: flex !important;
		flex-direction: column !important;
		justify-content: flex-start !important;
	}

	:global(.popular-title) {
		margin: 0 0 6px 0 !important;
		font-size: 13px !important;
		font-weight: 600 !important;
		color: #333 !important;
		line-height: 1.3 !important;
	}

	:global(.popular-meta) {
		display: flex !important;
		gap: 8px !important;
		align-items: center !important;
		margin-bottom: 6px !important;
	}

	:global(.popular-meta .type-badge) {
		background: #2563eb !important;
		color: #fff !important;
		padding: 2px 6px !important;
		border-radius: 2px !important;
		font-size: 10px !important;
		font-weight: 600 !important;
		text-transform: uppercase !important;
	}

	:global(.popular-meta .rating) {
		color: #ffc107 !important;
		font-size: 12px !important;
		font-weight: 600 !important;
	}

	:global(.popular-genres) {
		margin: 0 !important;
		font-size: 11px !important;
		color: #666 !important;
		line-height: 1.4 !important;
	}

	/* Genres Widget Styling */
	:global(.genres-widget) {
		background: #2a2a2a !important;
	}

	:global(.genres-widget .title) {
		color: #fff !important;
		border-bottom-color: #3a3a3a !important;
		font-size: 16px !important;
		font-weight: 600 !important;
	}

	:global(.genres-grid) {
		padding: 0 !important;
		display: grid !important;
		grid-template-columns: repeat(2, 1fr) !important;
		gap: 0 !important;
		max-height: 500px;
		overflow-y: auto;
	}

	:global(.genres-grid::-webkit-scrollbar) {
		width: 6px;
	}

	:global(.genres-grid::-webkit-scrollbar-track) {
		background: #1a1a1a;
	}

	:global(.genres-grid::-webkit-scrollbar-thumb) {
		background: #444;
		border-radius: 3px;
	}

	:global(.genres-grid::-webkit-scrollbar-thumb:hover) {
		background: #555;
	}

	:global(.genre-item) {
		display: flex !important;
		justify-content: space-between !important;
		align-items: center !important;
		padding: 4px 8px !important;
		background: #2a2a2a !important;
		border-radius: 2px !important;
		overflow: hidden !important;
		transition: all 0.5s ease-in-out !important;
		text-decoration: none !important;
		color: #ccc !important;
		margin: 4px !important;
	}

	:global(.genre-item:hover) {
		background: #333 !important;
	}

	:global(.genre-name) {
		font-size: 13px;
		color: #ccc;
		font-weight: 400;
	}

	:global(.genre-count) {
		background: #2563eb;
		color: #fff;
		font-size: 11px;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 2px;
		min-width: 24px;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	/* Light mode adjustments */
	:global(body:not(.dark) .genres-widget) {
		background: #f8f9fa !important;
	}

	:global(body:not(.dark) .genres-widget .title) {
		color: #333 !important;
		border-bottom-color: #e0e0e0 !important;
	}

	:global(body:not(.dark) .genre-item) {
		background: #f8f9fa !important;
		border-bottom-color: #e0e0e0 !important;
		color: #333 !important;
	}

	:global(body:not(.dark) .genre-item:hover) {
		background: #e9ecef !important;
	}

	:global(body:not(.dark) .genre-name) {
		color: #333;
	}

	:global(body:not(.dark) .genres-grid::-webkit-scrollbar-track) {
		background: #f1f1f1;
	}

	:global(body:not(.dark) .genres-grid::-webkit-scrollbar-thumb) {
		background: #888;
	}

	/* Responsive */
	@media screen and (max-width: 768px) {
		:global(.genres-grid) {
			grid-template-columns: 1fr !important;
		}
	}
</style>
