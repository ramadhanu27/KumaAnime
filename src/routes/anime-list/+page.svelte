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

<div id="outer-wrapper">
	<div class="page-container">
		<div class="page-header">
			<h1>Daftar Anime</h1>
			<p>Jelajahi koleksi anime lengkap dengan filter</p>
		</div>

		<!-- Filter Section -->
		<div class="filter-section">
			<div class="filter-group">
				<label for="genre-select">Genre:</label>
				<select id="genre-select" value={filters.genre} on:change={(e) => {
					window.location.href = buildFilterUrl(e.currentTarget.value, filters.status, 1);
				}}>
					<option value="">Semua Genre</option>
					{#each genres as genre}
						<option value={genre}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</option>
					{/each}
				</select>
			</div>

			<div class="filter-group">
				<label for="status-select">Status:</label>
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
				<a href="/anime-list" class="reset-btn">Reset Filter</a>
			{/if}
		</div>

		{#if error}
			<div class="error-container">
				<p>⚠️ {error}</p>
			</div>
		{:else if animeList && animeList.length > 0}
			<div class="anime-grid">
				{#each animeList as anime}
					<a href={`/detail?slug=anime${anime.slug.replace(/\//g, '')}`} class="anime-card">
						<div class="anime-cover">
							<img 
								src={anime.thumb} 
								alt={anime.title}
								on:error={(e) => {
									(e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/247x350/0c70de/ffffff?text=Tidak+Ada+Gambar';
								}}
							/>
						</div>
						<div class="anime-info">
							<h3>{anime.title}</h3>
							<div class="anime-type">{anime.type}</div>
						</div>
					</a>
				{/each}
			</div>

			<!-- Pagination -->
			{#if pagination.totalPages > 1}
				<div class="pagination-nav">
					{#if pagination.currentPage > 1}
						<button class="pagination-btn" on:click={() => goToPage(1)}>
							« Pertama
						</button>
						<button class="pagination-btn" on:click={() => goToPage(pagination.currentPage - 1)}>
							‹ Sebelumnya
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
							Selanjutnya ›
						</button>
						<button class="pagination-btn" on:click={() => goToPage(pagination.totalPages)}>
							Terakhir »
						</button>
					{/if}
				</div>

				<div class="pagination-info">
					Halaman {pagination.currentPage} dari {pagination.totalPages}
					{#if pagination.totalItems}
						({pagination.totalItems} anime)
					{/if}
				</div>
			{/if}
		{:else}
			<div class="empty-container">
				<p>📭 Tidak ada anime ditemukan dengan filter yang dipilih</p>
			</div>
		{/if}
	</div>
</div>

<Footer />

<style>
	.page-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.page-header {
		text-align: center;
		margin-bottom: 30px;
	}

	.page-header h1 {
		margin: 0 0 10px 0;
		font-size: 32px;
		color: #333;
	}

	.page-header p {
		margin: 0;
		font-size: 16px;
		color: #666;
	}

	.filter-section {
		display: flex;
		gap: 15px;
		margin-bottom: 30px;
		padding: 20px;
		background: #fff;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		flex-wrap: wrap;
		align-items: center;
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.filter-group label {
		font-weight: 600;
		color: #333;
		font-size: 14px;
	}

	.filter-group select {
		padding: 8px 12px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
		background: #fff;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.filter-group select:hover {
		border-color: #0c70de;
	}

	.filter-group select:focus {
		outline: none;
		border-color: #0c70de;
		box-shadow: 0 0 0 2px rgba(12, 112, 222, 0.1);
	}

	.reset-btn {
		padding: 8px 16px;
		background: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 4px;
		text-decoration: none;
		color: #333;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.reset-btn:hover {
		background: #e0e0e0;
		border-color: #999;
	}

	.error-container {
		background: #fee;
		border: 1px solid #fcc;
		color: #c33;
		padding: 15px;
		border-radius: 4px;
		margin-bottom: 20px;
		text-align: center;
	}

	.error-container p {
		margin: 0;
	}

	.anime-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
		margin-bottom: 40px;
	}

	.anime-card {
		background: #fff;
		border-radius: 4px;
		overflow: hidden;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.anime-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 12px rgba(12, 112, 222, 0.15);
	}

	.anime-cover {
		width: 100%;
		aspect-ratio: 247 / 350;
		overflow: hidden;
		background: #f0f0f0;
	}

	.anime-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.anime-info {
		padding: 12px;
	}

	.anime-info h3 {
		margin: 0 0 8px 0;
		font-size: 13px;
		font-weight: 600;
		color: #333;
		line-height: 1.3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.anime-type {
		font-size: 11px;
		padding: 4px 8px;
		background: #f0f0f0;
		border-radius: 3px;
		color: #0c70de;
		font-weight: 600;
		display: inline-block;
	}

	.empty-container {
		text-align: center;
		padding: 60px 20px;
		background: #f9f9f9;
		border-radius: 4px;
		color: #999;
		font-size: 18px;
	}

	.pagination-nav {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		margin-bottom: 20px;
		flex-wrap: wrap;
	}

	.page-numbers {
		display: flex;
		gap: 4px;
	}

	.pagination-btn,
	.page-number {
		padding: 10px 12px;
		background: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		color: #333;
		transition: all 0.3s ease;
	}

	.pagination-btn:hover,
	.page-number:hover {
		background: #e0e0e0;
		border-color: #0c70de;
	}

	.page-number.active {
		background: #0c70de;
		color: #fff;
		border-color: #0c70de;
	}

	.pagination-info {
		text-align: center;
		color: #666;
		font-size: 14px;
		margin-bottom: 20px;
	}

	@media screen and (max-width: 768px) {
		.page-header h1 {
			font-size: 24px;
		}

		.filter-section {
			flex-direction: column;
			align-items: stretch;
		}

		.filter-group {
			flex-direction: column;
			align-items: flex-start;
		}

		.filter-group select {
			width: 100%;
		}

		.reset-btn {
			width: 100%;
			text-align: center;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			gap: 15px;
		}

		.pagination-nav {
			gap: 4px;
		}

		.pagination-btn,
		.page-number {
			padding: 8px 10px;
			font-size: 12px;
		}
	}
</style>
