<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import Seo from '$lib/Seo.svelte';

	export let data;

	$: animeList = data.animeList;
	$: pagination = data.pagination;
	$: filters = data.filters;
	$: error = data.error;

	const genres = [
		'action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror',
		'mystery', 'romance', 'sci-fi', 'slice-of-life', 'sports',
		'supernatural', 'thriller', 'mecha', 'music', 'school',
		'shounen', 'shoujo', 'seinen', 'josei', 'isekai', 'harem', 'ecchi'
	];

	function buildFilterUrl(newGenre?: string, newPage?: number) {
		const params = new URLSearchParams();
		const genre = newGenre !== undefined ? newGenre : filters.genre;
		const page = newPage || 1;

		if (genre) params.append('genre', genre);
		if (page > 1) params.append('page', page.toString());

		return `/anime-list?${params.toString()}`;
	}

	function goToPage(pageNum: number) {
		window.location.href = buildFilterUrl(undefined, pageNum);
	}

	$: genreTitle = filters.genre.charAt(0).toUpperCase() + filters.genre.slice(1).replace('-', ' ');
</script>

<Seo 
	title={`Daftar Anime ${genreTitle} Sub Indo ${pagination.currentPage > 1 ? `- Halaman ${pagination.currentPage}` : ''} | KumaStream`}
	description={`Daftar anime ${genreTitle.toLowerCase()} subtitle Indonesia terlengkap. Nonton dan streaming anime ${genreTitle.toLowerCase()} terbaik di KumaStream.`}
	keywords={`anime ${filters.genre}, daftar anime ${filters.genre}, streaming anime ${filters.genre}, anime ${filters.genre} sub indo, nonton anime ${filters.genre}`}
	url={`/anime-list?genre=${filters.genre}${pagination.currentPage > 1 ? `&page=${pagination.currentPage}` : ''}`}
/>

<Header />
<Navigation />

<main class="anime-list-page">
	<div class="section-header">
		<h2>Daftar Anime</h2>
		<span class="subtitle">Genre: {genreTitle}</span>
	</div>

	<!-- Filter Section -->
	<div class="filter-section">
		<div class="filter-group">
			<label for="genre-select">Genre</label>
			<select id="genre-select" value={filters.genre} on:change={(e) => {
				window.location.href = buildFilterUrl(e.currentTarget.value, 1);
			}}>
				{#each genres as genre}
					<option value={genre}>{genre.charAt(0).toUpperCase() + genre.slice(1).replace('-', ' ')}</option>
				{/each}
			</select>
		</div>
	</div>

	{#if error}
		<div class="error-container">
			<p>{error}</p>
		</div>
	{:else if animeList && animeList.length > 0}
		<div class="anime-grid">
			{#each animeList as anime}
				<a href={`/detail/${encodeURIComponent(anime.animeId)}`} class="anime-card">
					<div class="card-image">
						<img 
							src={anime.poster} 
							alt={anime.title}
							loading="lazy"
							on:error={(e) => {
								(e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/247x350/18181b/52525b?text=No+Image';
							}}
						/>
						<div class="card-overlay">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
								<polygon points="5 3 19 12 5 21 5 3"/>
							</svg>
						</div>
						{#if anime.score}
							<span class="score-badge">★ {anime.score}</span>
						{/if}
						{#if anime.episodes}
							<span class="episode-badge">{anime.episodes} Eps</span>
						{/if}
					</div>
					<div class="card-content">
						<h3>{anime.title}</h3>
						<div class="card-meta">
							{#if anime.studios}
								<span class="studio">{anime.studios}</span>
							{/if}
							{#if anime.season}
								<span class="season">{anime.season}</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>

		<!-- Pagination -->
		{#if pagination.totalPages > 1}
			<div class="pagination">
				<div class="pagination-controls">
					{#if pagination.hasPrevPage}
						<button class="pagination-btn" on:click={() => goToPage(1)}>
							««
						</button>
						<button class="pagination-btn" on:click={() => goToPage(pagination.currentPage - 1)}>
							«
						</button>
					{/if}

					<div class="page-numbers">
						{#each Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
							const start = Math.max(1, pagination.currentPage - 2);
							return start + i;
						}) as pageNum}
							{#if pageNum <= pagination.totalPages}
								<button
									class="page-number"
									class:active={pageNum === pagination.currentPage}
									on:click={() => goToPage(pageNum)}
								>
									{pageNum}
								</button>
							{/if}
						{/each}
					</div>

					{#if pagination.hasNextPage}
						<button class="pagination-btn" on:click={() => goToPage(pagination.currentPage + 1)}>
							»
						</button>
						<button class="pagination-btn" on:click={() => goToPage(pagination.totalPages)}>
							»»
						</button>
					{/if}
				</div>

				<div class="pagination-info">
					Halaman {pagination.currentPage} dari {pagination.totalPages}
				</div>
			</div>
		{/if}
	{:else}
		<div class="empty-container">
			<h3>Tidak ada anime</h3>
			<p>Tidak ditemukan anime dengan genre yang dipilih</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.anime-list-page {
		max-width: 1400px;
		margin: 0 auto;
		padding: 120px 24px 40px;
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

	.subtitle {
		color: #71717a;
		font-size: 13px;
	}

	/* Filter Section */
	.filter-section {
		display: flex;
		gap: 16px;
		margin-bottom: 24px;
		padding: 16px;
		background: #18181b;
		border-radius: 8px;
		flex-wrap: wrap;
		align-items: flex-end;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.filter-group label {
		font-weight: 500;
		color: #71717a;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.filter-group select {
		padding: 10px 14px;
		background: #27272a;
		border: 1px solid #3f3f46;
		border-radius: 6px;
		color: #f4f4f5;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 180px;
	}

	.filter-group select:hover {
		border-color: #52525b;
	}

	.filter-group select:focus {
		outline: none;
		border-color: #facc15;
	}

	.filter-group select option {
		background: #27272a;
		color: #f4f4f5;
	}

	.error-container {
		text-align: center;
		padding: 40px;
		background: #18181b;
		border-radius: 8px;
		color: #dc2626;
	}

	.error-container p {
		margin: 0;
	}

	.anime-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
		gap: 16px;
		margin-bottom: 32px;
	}

	.anime-card {
		background: #18181b;
		border-radius: 6px;
		overflow: hidden;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.anime-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0,0,0,0.4);
	}

	.card-image {
		position: relative;
		width: 100%;
		padding-top: 142%;
		background: #27272a;
		overflow: hidden;
	}

	.card-image img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s;
	}

	.anime-card:hover .card-image img {
		transform: scale(1.05);
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0,0,0,0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.2s;
		color: #fff;
	}

	.anime-card:hover .card-overlay {
		opacity: 1;
	}

	.score-badge {
		position: absolute;
		top: 8px;
		right: 8px;
		padding: 3px 8px;
		background: #facc15;
		color: #0f0f0f;
		font-size: 10px;
		font-weight: 600;
		border-radius: 2px;
	}

	.episode-badge {
		position: absolute;
		bottom: 8px;
		left: 8px;
		padding: 3px 8px;
		background: #3b82f6;
		color: #fff;
		font-size: 10px;
		font-weight: 600;
		border-radius: 2px;
	}

	.card-content {
		padding: 12px;
	}

	.card-content h3 {
		color: #e4e4e7;
		font-size: 13px;
		font-weight: 500;
		margin: 0 0 6px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.4;
	}

	.anime-card:hover .card-content h3 {
		color: #facc15;
	}

	.card-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.studio, .season {
		font-size: 11px;
		color: #71717a;
	}

	/* Pagination */
	.pagination {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.pagination-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: #27272a;
		border: 1px solid #3f3f46;
		border-radius: 6px;
		color: #a1a1aa;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 14px;
	}

	.pagination-btn:hover {
		background: #3f3f46;
		color: #f4f4f5;
	}

	.page-numbers {
		display: flex;
		gap: 4px;
	}

	.page-number {
		width: 36px;
		height: 36px;
		background: #27272a;
		border: 1px solid #3f3f46;
		border-radius: 6px;
		color: #a1a1aa;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.page-number:hover {
		background: #3f3f46;
		color: #f4f4f5;
	}

	.page-number.active {
		background: #facc15;
		border-color: #facc15;
		color: #0f0f0f;
	}

	.pagination-info {
		color: #71717a;
		font-size: 13px;
	}

	.empty-container {
		text-align: center;
		padding: 60px 40px;
		background: #18181b;
		border-radius: 8px;
	}

	.empty-container h3 {
		color: #f4f4f5;
		font-size: 20px;
		margin: 0 0 8px;
	}

	.empty-container p {
		color: #71717a;
		margin: 0;
	}

	@media (max-width: 768px) {
		.anime-list-page {
			padding: 72px 16px 80px;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}

		.filter-section {
			flex-direction: column;
			gap: 12px;
		}

		.filter-group {
			width: 100%;
		}

		.filter-group select {
			width: 100%;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
			gap: 12px;
		}

		.pagination-controls {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>
