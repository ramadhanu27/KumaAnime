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
				<div class="popular-header">
					<h2 class="judul-pop">Anime Popular</h2>
				</div>
				<div class="popular-list">
					{#each popularAnime as anime, index (anime.slug)}
						<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`} class="popular-item" class:featured={index === 0}>
							{#if index === 0}
								<div class="featured-image">
									<img
										src={anime.thumb}
										alt={anime.title}
										on:error={(e) => {
											(e.currentTarget as HTMLImageElement).src =
												'https://via.placeholder.com/300x400/0c70de/ffffff?text=No+Image';
										}}
									/>
									<div class="featured-overlay">
										<h3 class="featured-title">{anime.title}</h3>
										<div class="featured-meta">
											<span class="type-badge">TV</span>
											<!-- <span class="rating">★ {anime.rating}</span> -->
										</div>
										<p class="featured-genres">{anime.genres?.slice(0, 3).join(', ') || 'N/A'}</p>
									</div>
								</div>
							{:else}
								<!-- Regular Items -->
								<div class="rank-number" class:top3={index < 3}>
									<span>{index + 1}</span>
								</div>
								<div class="popular-image">
									<img
										src={anime.thumb}
										alt={anime.title}
										on:error={(e) => {
											(e.currentTarget as HTMLImageElement).src =
												'https://via.placeholder.com/300x400/0c70de/ffffff?text=No+Image';
										}}
									/>
								</div>
								<div class="popular-content">
									<h3 class="popular-title">{anime.title}</h3>
									<div class="popular-meta">
										<span class="type-badge">TV</span>
										<!-- <span class="rating">★ {anime.rating}</span> -->
									</div>
									<p class="popular-genres">{anime.genres?.slice(0, 3).join(', ') || 'N/A'}</p>
								</div>
							{/if}
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

	/* Popular Widget Styling - Modern Premium Design */
	:global(.popular-widget) {
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%) !important;
		padding: 0 !important;
		border-radius: 16px !important;
		overflow: hidden !important;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
	}

	:global(.popular-header) {
		display: flex !important;
		align-items: center !important;
		gap: 10px !important;
		padding: 18px 20px !important;
		background: linear-gradient(135deg, #e91e63 0%, #ff5722 100%) !important;
		position: relative !important;
		overflow: hidden !important;
	}

	:global(.popular-header::before) {
		content: '' !important;
		position: absolute !important;
		top: -50% !important;
		right: -50% !important;
		width: 100% !important;
		height: 200% !important;
		background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%) !important;
		pointer-events: none !important;
	}

	:global(.popular-icon) {
		font-size: 24px !important;
		animation: flame 1s ease-in-out infinite alternate !important;
	}

	@keyframes flame {
		0% { transform: scale(1) rotate(-5deg); }
		100% { transform: scale(1.1) rotate(5deg); }
	}

	:global(.popular-widget .judul-pop) {
		color: #fff !important;
		font-size: 18px !important;
		font-weight: 700 !important;
		margin: 0 !important;
		text-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
		letter-spacing: 0.5px !important;
	}

	:global(.popular-list) {
		display: flex !important;
		flex-direction: column !important;
		gap: 0 !important;
		padding: 0 !important;
	}

	/* Featured #1 Item Styles */
	:global(.popular-item.featured) {
		flex-direction: column !important;
		padding: 0 !important;
		background: transparent !important;
		border-bottom: none !important;
	}

	:global(.featured-badge) {
		position: absolute !important;
		top: 12px !important;
		left: 12px !important;
		background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%) !important;
		color: #1a1a2e !important;
		padding: 6px 14px !important;
		border-radius: 20px !important;
		font-size: 14px !important;
		font-weight: 800 !important;
		display: flex !important;
		align-items: center !important;
		gap: 4px !important;
		z-index: 10 !important;
		box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4) !important;
	}

	:global(.featured-badge .crown) {
		font-size: 16px !important;
	}

	:global(.featured-image) {
		position: relative !important;
		width: 100% !important;
		height: 200px !important;
		overflow: hidden !important;
	}

	:global(.featured-image img) {
		width: 100% !important;
		height: 100% !important;
		object-fit: cover !important;
		transition: transform 0.5s ease !important;
	}

	:global(.popular-item.featured:hover .featured-image img) {
		transform: scale(1.05) !important;
	}

	:global(.featured-overlay) {
		position: absolute !important;
		bottom: 0 !important;
		left: 0 !important;
		right: 0 !important;
		padding: 50px 15px 15px 15px !important;
		background: linear-gradient(to top, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.7) 50%, transparent 100%) !important;
	}

	:global(.featured-title) {
		color: #fff !important;
		font-size: 16px !important;
		font-weight: 700 !important;
		margin: 0 0 8px 0 !important;
		line-height: 1.3 !important;
		text-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
	}

	:global(.featured-meta) {
		display: flex !important;
		gap: 10px !important;
		align-items: center !important;
		margin-bottom: 6px !important;
	}

	:global(.featured-meta .type-badge) {
		background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%) !important;
		color: #fff !important;
		padding: 4px 10px !important;
		border-radius: 4px !important;
		font-size: 11px !important;
		font-weight: 700 !important;
		text-transform: uppercase !important;
		letter-spacing: 0.5px !important;
	}

	:global(.featured-meta .rating) {
		color: #ffd700 !important;
		font-size: 14px !important;
		font-weight: 700 !important;
		text-shadow: 0 0 10px rgba(255, 215, 0, 0.5) !important;
	}

	:global(.featured-genres) {
		color: rgba(255, 255, 255, 0.7) !important;
		font-size: 12px !important;
		margin: 0 !important;
	}

	/* Regular Items Styles */
	:global(.popular-item:not(.featured)) {
		display: flex !important;
		gap: 14px !important;
		padding: 14px 16px !important;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
		text-decoration: none !important;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
		position: relative !important;
		align-items: center !important;
	}

	:global(.popular-item:not(.featured):hover) {
		background: rgba(255, 255, 255, 0.05) !important;
		transform: translateX(5px) !important;
	}

	:global(.popular-item:not(.featured):hover::before) {
		content: '' !important;
		position: absolute !important;
		left: 0 !important;
		top: 0 !important;
		bottom: 0 !important;
		width: 3px !important;
		background: linear-gradient(to bottom, #e91e63, #ff5722) !important;
	}

	:global(.rank-number) {
		width: 30px !important;
		height: 30px !important;
		background: rgba(255, 255, 255, 0.1) !important;
		border-radius: 8px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		flex-shrink: 0 !important;
		font-weight: 700 !important;
		font-size: 14px !important;
		color: rgba(255, 255, 255, 0.6) !important;
		transition: all 0.3s ease !important;
	}

	:global(.rank-number.top3) {
		background: linear-gradient(135deg, #e91e63 0%, #ff5722 100%) !important;
		color: #fff !important;
		box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3) !important;
	}

	:global(.popular-image) {
		position: relative !important;
		width: 55px !important;
		height: 75px !important;
		flex-shrink: 0 !important;
		border-radius: 8px !important;
		overflow: hidden !important;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
	}

	:global(.popular-image img) {
		width: 100% !important;
		height: 100% !important;
		object-fit: cover !important;
		transition: transform 0.3s ease !important;
	}

	:global(.popular-item:hover .popular-image img) {
		transform: scale(1.1) !important;
	}

	:global(.popular-content) {
		flex: 1 !important;
		display: flex !important;
		flex-direction: column !important;
		justify-content: center !important;
		min-width: 0 !important;
	}

	:global(.popular-title) {
		margin: 0 0 6px 0 !important;
		font-size: 13px !important;
		font-weight: 600 !important;
		color: #fff !important;
		line-height: 1.3 !important;
		display: -webkit-box !important;
		-webkit-line-clamp: 2 !important;
		-webkit-box-orient: vertical !important;
		overflow: hidden !important;
		transition: color 0.3s ease !important;
	}

	:global(.popular-item:hover .popular-title) {
		color: #e91e63 !important;
	}

	:global(.popular-meta) {
		display: flex !important;
		gap: 8px !important;
		align-items: center !important;
		margin-bottom: 4px !important;
	}

	:global(.popular-meta .type-badge) {
		background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%) !important;
		color: #fff !important;
		padding: 2px 8px !important;
		border-radius: 4px !important;
		font-size: 9px !important;
		font-weight: 700 !important;
		text-transform: uppercase !important;
		letter-spacing: 0.5px !important;
	}

	:global(.popular-meta .rating) {
		color: #ffd700 !important;
		font-size: 12px !important;
		font-weight: 700 !important;
	}

	:global(.popular-genres) {
		margin: 0 !important;
		font-size: 11px !important;
		color: rgba(255, 255, 255, 0.5) !important;
		line-height: 1.4 !important;
		white-space: nowrap !important;
		overflow: hidden !important;
		text-overflow: ellipsis !important;
	}

	/* Genres Widget Styling */
	:global(.genres-widget) {
		background: rgba(26, 26, 46, 0.9) !important;
		backdrop-filter: blur(10px) !important;
		border-radius: 16px !important;
		border: 1px solid rgba(255, 255, 255, 0.05) !important;
		overflow: hidden !important;
	}

	:global(.genres-widget .title) {
		color: #f8fafc !important;
		font-size: 16px !important;
		font-weight: 700 !important;
		padding: 16px 20px !important;
		margin: 0 !important;
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%) !important;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
		display: flex !important;
		align-items: center !important;
		gap: 10px !important;
	}

	:global(.genres-widget .title::before) {
		content: '' !important;
		display: inline-block !important;
		width: 4px !important;
		height: 18px !important;
		background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%) !important;
		border-radius: 2px !important;
	}

	:global(.genres-grid) {
		padding: 16px !important;
		display: flex !important;
		flex-wrap: wrap !important;
		gap: 8px !important;
		max-height: 400px;
		overflow-y: auto;
	}

	:global(.genres-grid::-webkit-scrollbar) {
		width: 6px;
	}

	:global(.genres-grid::-webkit-scrollbar-track) {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}

	:global(.genres-grid::-webkit-scrollbar-thumb) {
		background: rgba(99, 102, 241, 0.4);
		border-radius: 10px;
	}

	:global(.genres-grid::-webkit-scrollbar-thumb:hover) {
		background: rgba(99, 102, 241, 0.6);
	}

	:global(.genre-item) {
		display: inline-flex !important;
		align-items: center !important;
		gap: 8px !important;
		padding: 8px 14px !important;
		background: rgba(99, 102, 241, 0.1) !important;
		border: 1px solid rgba(99, 102, 241, 0.2) !important;
		border-radius: 20px !important;
		text-decoration: none !important;
		transition: all 0.3s ease !important;
	}

	:global(.genre-item:hover) {
		background: rgba(99, 102, 241, 0.25) !important;
		border-color: rgba(99, 102, 241, 0.4) !important;
		transform: translateY(-2px) !important;
		box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2) !important;
	}

	:global(.genre-name) {
		font-size: 12px !important;
		color: rgba(248, 250, 252, 0.9) !important;
		font-weight: 500 !important;
	}

	:global(.genre-count) {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
		color: #fff !important;
		font-size: 10px !important;
		font-weight: 700 !important;
		padding: 3px 8px !important;
		border-radius: 10px !important;
		min-width: 22px !important;
		text-align: center !important;
	}

	/* Light mode adjustments */
	:global(body:not(.dark) .genres-widget) {
		background: #ffffff !important;
		border-color: rgba(0, 0, 0, 0.08) !important;
	}

	:global(body:not(.dark) .genres-widget .title) {
		color: #1a1a2e !important;
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%) !important;
		border-bottom-color: rgba(0, 0, 0, 0.05) !important;
	}

	:global(body:not(.dark) .genre-item) {
		background: rgba(99, 102, 241, 0.08) !important;
		border-color: rgba(99, 102, 241, 0.15) !important;
	}

	:global(body:not(.dark) .genre-item:hover) {
		background: rgba(99, 102, 241, 0.15) !important;
		border-color: rgba(99, 102, 241, 0.3) !important;
	}

	:global(body:not(.dark) .genre-name) {
		color: #1a1a2e !important;
	}

	:global(body:not(.dark) .genres-grid::-webkit-scrollbar-track) {
		background: rgba(0, 0, 0, 0.05);
	}

	:global(body:not(.dark) .genres-grid::-webkit-scrollbar-thumb) {
		background: rgba(99, 102, 241, 0.3);
	}

	/* Responsive */
	@media screen and (max-width: 768px) {
		:global(.genres-grid) {
			max-height: 300px !important;
		}
	}
</style>
