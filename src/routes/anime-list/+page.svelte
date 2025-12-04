<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;

	$: animeList = data.animeList;
	$: pagination = data.pagination;
	$: filters = data.filters;
	$: error = data.error;

	const genres = [
		'action',
		'adventure',
		'comedy',
		'drama',
		'fantasy',
		'horror',
		'mystery',
		'romance',
		'sci-fi',
		'slice-of-life',
		'sports',
		'supernatural',
		'thriller'
	];

	const statuses = ['ongoing', 'completed', 'upcoming'];

	function buildFilterUrl(newGenre?: string, newStatus?: string, newPage?: number) {
		const params = new URLSearchParams();
		const genre = newGenre !== undefined ? newGenre : filters.genre;
		const status = newStatus !== undefined ? newStatus : filters.status;
		const page = newPage || 1;

		if (genre) params.append('genre', genre);
		if (status) params.append('status', status);
		if (page > 1) params.append('page', page.toString());

		return `/anime-list?${params.toString()}`;
	}

	function goToPage(pageNum: number) {
		window.location.href = buildFilterUrl(undefined, undefined, pageNum);
	}
</script>

<Header />
<Navigation />

<main class="anime-list-page">
	<div class="page-header">
		<div class="header-icon">
			<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
			</svg>
		</div>
		<h1>Daftar Anime</h1>
		<p>Jelajahi koleksi anime lengkap dengan filter</p>
	</div>

	<!-- Filter Section -->
	<div class="filter-section">
		<div class="filter-group">
			<label for="genre-select">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
				</svg>
				Genre
			</label>
			<select id="genre-select" value={filters.genre} on:change={(e) => {
				window.location.href = buildFilterUrl(e.currentTarget.value, filters.status, 1);
			}}>
				<option value="">Semua Genre</option>
				{#each genres as genre}
					<option value={genre}>{genre.charAt(0).toUpperCase() + genre.slice(1).replace('-', ' ')}</option>
				{/each}
			</select>
		</div>

		<div class="filter-group">
			<label for="status-select">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
				</svg>
				Status
			</label>
			<select id="status-select" value={filters.status} on:change={(e) => {
				window.location.href = buildFilterUrl(filters.genre, e.currentTarget.value, 1);
			}}>
				<option value="">Semua Status</option>
				{#each statuses as status}
					<option value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
				{/each}
			</select>
		</div>

		{#if filters.genre || filters.status}
			<a href="/anime-list" class="reset-btn">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
				</svg>
				Reset Filter
			</a>
		{/if}
	</div>

	{#if error}
		<div class="error-container">
			<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
			</svg>
			<p>{error}</p>
		</div>
	{:else if animeList && animeList.length > 0}
		<div class="anime-grid">
			{#each animeList as anime}
				<a href={`/detail?slug=anime${anime.slug.replace(/\//g, '')}`} class="anime-card">
					<div class="card-image">
						<img 
							src={anime.thumb} 
							alt={anime.title}
							loading="lazy"
							on:error={(e) => {
								(e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/247x350/1a1a2e/6366f1?text=No+Image';
							}}
						/>
						<div class="card-overlay">
							<div class="view-button">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
								</svg>
							</div>
						</div>
					</div>
					<div class="card-content">
						<h3>{anime.title}</h3>
						{#if anime.type}
							<span class="type-badge">{anime.type}</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>

		<!-- Pagination -->
		{#if pagination.totalPages > 1}
			<div class="pagination">
				<div class="pagination-controls">
					{#if pagination.currentPage > 1}
						<button class="pagination-btn" on:click={() => goToPage(1)}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>
							</svg>
						</button>
						<button class="pagination-btn" on:click={() => goToPage(pagination.currentPage - 1)}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M19 12H5M12 19l-7-7 7-7"/>
							</svg>
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

					{#if pagination.currentPage < pagination.totalPages}
						<button class="pagination-btn" on:click={() => goToPage(pagination.currentPage + 1)}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M5 12h14M12 5l7 7-7 7"/>
							</svg>
						</button>
						<button class="pagination-btn" on:click={() => goToPage(pagination.totalPages)}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
							</svg>
						</button>
					{/if}
				</div>

				<div class="pagination-info">
					Halaman {pagination.currentPage} dari {pagination.totalPages}
					{#if pagination.totalItems}
						<span class="total-items">({pagination.totalItems} anime)</span>
					{/if}
				</div>
			</div>
		{/if}
	{:else}
		<div class="empty-container">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
			</svg>
			<h3>Tidak ada anime</h3>
			<p>Tidak ditemukan anime dengan filter yang dipilih</p>
			<a href="/anime-list" class="reset-link">Reset Filter</a>
		</div>
	{/if}
</main>

<Footer />

<style>
	.anime-list-page {
		min-height: 100vh;
		padding: 130px 24px 60px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		text-align: center;
		margin-bottom: 40px;
	}

	.header-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 16px;
		color: white;
		margin-bottom: 20px;
	}

	.page-header h1 {
		font-size: 36px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 8px;
	}

	.page-header p {
		color: rgba(248, 250, 252, 0.6);
		font-size: 16px;
		margin: 0;
	}

	/* Filter Section */
	.filter-section {
		display: flex;
		gap: 20px;
		margin-bottom: 40px;
		padding: 24px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		flex-wrap: wrap;
		align-items: flex-end;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.filter-group label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		color: rgba(248, 250, 252, 0.7);
		font-size: 13px;
	}

	.filter-group label svg {
		color: #818cf8;
	}

	.filter-group select {
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: #f8fafc;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 180px;
	}

	.filter-group select:hover {
		border-color: rgba(99, 102, 241, 0.5);
	}

	.filter-group select:focus {
		outline: none;
		border-color: #6366f1;
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
	}

	.filter-group select option {
		background: #1a1a2e;
		color: #f8fafc;
	}

	.reset-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		background: rgba(244, 63, 94, 0.15);
		border: 1px solid rgba(244, 63, 94, 0.3);
		border-radius: 10px;
		color: #f43f5e;
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.reset-btn:hover {
		background: #f43f5e;
		color: white;
		border-color: transparent;
	}

	.error-container {
		text-align: center;
		padding: 60px 40px;
		background: rgba(244, 63, 94, 0.1);
		border: 1px solid rgba(244, 63, 94, 0.2);
		border-radius: 20px;
		color: #f43f5e;
	}

	.error-container svg {
		margin-bottom: 16px;
	}

	.error-container p {
		margin: 0;
	}

	.anime-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 24px;
		margin-bottom: 48px;
	}

	.anime-card {
		background: rgba(26, 26, 46, 0.8);
		border-radius: 16px;
		overflow: hidden;
		text-decoration: none;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.anime-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		border-color: rgba(99, 102, 241, 0.3);
	}

	.card-image {
		position: relative;
		aspect-ratio: 3/4;
		overflow: hidden;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.anime-card:hover .card-image img {
		transform: scale(1.1);
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.anime-card:hover .card-overlay {
		opacity: 1;
	}

	.view-button {
		width: 48px;
		height: 48px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transform: scale(0.8);
		transition: transform 0.3s ease;
	}

	.anime-card:hover .view-button {
		transform: scale(1);
	}

	.card-content {
		padding: 16px;
	}

	.card-content h3 {
		color: #f8fafc;
		font-size: 14px;
		font-weight: 600;
		margin: 0 0 8px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.4;
	}

	.type-badge {
		display: inline-block;
		padding: 4px 10px;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 6px;
		color: #818cf8;
		font-size: 11px;
		font-weight: 600;
	}

	/* Pagination */
	.pagination {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.pagination-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: rgba(248, 250, 252, 0.7);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.pagination-btn:hover {
		background: rgba(99, 102, 241, 0.2);
		border-color: rgba(99, 102, 241, 0.4);
		color: #818cf8;
	}

	.page-numbers {
		display: flex;
		gap: 4px;
	}

	.page-number {
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: rgba(248, 250, 252, 0.7);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.page-number:hover {
		background: rgba(99, 102, 241, 0.2);
		border-color: rgba(99, 102, 241, 0.4);
		color: #818cf8;
	}

	.page-number.active {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-color: transparent;
		color: white;
	}

	.pagination-info {
		color: rgba(248, 250, 252, 0.6);
		font-size: 14px;
	}

	.total-items {
		color: rgba(248, 250, 252, 0.4);
	}

	.empty-container {
		text-align: center;
		padding: 80px 40px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.empty-container svg {
		color: rgba(248, 250, 252, 0.3);
		margin-bottom: 24px;
	}

	.empty-container h3 {
		color: #f8fafc;
		font-size: 24px;
		margin: 0 0 8px;
	}

	.empty-container p {
		color: rgba(248, 250, 252, 0.6);
		margin: 0 0 24px;
	}

	.reset-link {
		display: inline-block;
		padding: 12px 24px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
		text-decoration: none;
		border-radius: 12px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.reset-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
	}

	@media (max-width: 768px) {
		.anime-list-page {
			padding: 80px 16px 100px;
		}

		.page-header h1 {
			font-size: 28px;
		}

		.filter-section {
			flex-direction: column;
			gap: 16px;
		}

		.filter-group {
			width: 100%;
		}

		.filter-group select {
			width: 100%;
		}

		.reset-btn {
			width: 100%;
			justify-content: center;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 16px;
		}

		.pagination-controls {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>
