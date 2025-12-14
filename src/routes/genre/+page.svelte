<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import { page } from '$app/stores';

	export let data;

	$: genreData = data.genreData;
	$: pagination = data.pagination;
	$: currentSlug = data.currentSlug;
	$: error = data.error;

	function handleImageError(event: Event) {
		const img = event.target as HTMLImageElement;
		img.src = 'https://via.placeholder.com/300x420/1a1a2e/6366f1?text=No+Image';
	}
</script>

<svelte:head>
	<title>{genreData?.title || 'Genre'} - KumaStream</title>
	<meta name="description" content="Daftar anime dengan genre {genreData?.title || ''} subtitle Indonesia di KumaStream.">
</svelte:head>

<Header />
<Navigation />

<main class="genre-page">
	{#if error}
		<div class="error-container">
			<div class="error-icon">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
			</div>
			<h2>Genre Tidak Ditemukan</h2>
			<p>{error}</p>
			<a href="/" class="back-btn">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Kembali ke Beranda
			</a>
		</div>
	{:else if genreData}
		<div class="genre-container">
			<!-- Header Section -->
			<div class="genre-header">
				<div class="header-content">
					<div class="genre-icon">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
							<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
						</svg>
					</div>
					<div>
						<h1>{genreData.title}</h1>
						<p>Menampilkan anime dengan genre {genreData.title}</p>
					</div>
				</div>
				{#if pagination}
					<div class="result-count">
						<span>Halaman {pagination.currentPage} dari {pagination.totalPages}</span>
					</div>
				{/if}
			</div>

			<!-- Anime Grid -->
			{#if genreData.animeList?.length > 0}
				<div class="anime-grid">
					{#each genreData.animeList as anime}
						<a href={`/detail?slug=${anime.animeId}`} class="anime-card">
							<div class="card-image">
								<img src={anime.poster} alt={anime.title} on:error={handleImageError} loading="lazy" />
								<div class="card-overlay">
									<span class="play-icon">
										<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
											<polygon points="5 3 19 12 5 21 5 3"/>
										</svg>
									</span>
								</div>
								{#if anime.episode}
									<span class="episode-badge">{anime.episode}</span>
								{/if}
							</div>
							<div class="card-content">
								<h3 class="card-title">{anime.title}</h3>
								{#if anime.releaseDay}
									<span class="release-day">{anime.releaseDay}</span>
								{/if}
							</div>
						</a>
					{/each}
				</div>

				<!-- Pagination -->
				{#if pagination && pagination.totalPages > 1}
					<div class="pagination">
						{#if pagination.hasPrevPage}
							<a href={`/genre?slug=${currentSlug}&page=${pagination.currentPage - 1}`} class="page-btn prev">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M19 12H5M12 19l-7-7 7-7"/>
								</svg>
								Sebelumnya
							</a>
						{/if}

						<div class="page-numbers">
							{#each Array(Math.min(5, pagination.totalPages)) as _, i}
								{@const pageNum = Math.max(1, pagination.currentPage - 2) + i}
								{#if pageNum <= pagination.totalPages}
									<a 
										href={`/genre?slug=${currentSlug}&page=${pageNum}`}
										class="page-num"
										class:active={pageNum === pagination.currentPage}
									>
										{pageNum}
									</a>
								{/if}
							{/each}
						</div>

						{#if pagination.hasNextPage}
							<a href={`/genre?slug=${currentSlug}&page=${pagination.currentPage + 1}`} class="page-btn next">
								Selanjutnya
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M5 12h14M12 5l7 7-7 7"/>
								</svg>
							</a>
						{/if}
					</div>
				{/if}
			{:else}
				<div class="empty-state">
					<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
						<circle cx="12" cy="7" r="4"/>
					</svg>
					<p>Tidak ada anime dengan genre ini</p>
				</div>
			{/if}
		</div>
	{:else}
		<div class="loading-container">
			<div class="loader"></div>
			<p>Memuat data genre...</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.genre-page {
		min-height: 100vh;
		padding: 120px 24px 60px;
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Error Container */
	.error-container {
		text-align: center;
		padding: 60px 40px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		max-width: 500px;
		margin: 40px auto;
	}

	.error-icon {
		color: #f43f5e;
		margin-bottom: 20px;
	}

	.error-container h2 {
		color: #f8fafc;
		font-size: 24px;
		margin: 0 0 12px;
	}

	.error-container p {
		color: rgba(248, 250, 252, 0.6);
		margin: 0 0 24px;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
		text-decoration: none;
		border-radius: 12px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.back-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
	}

	/* Genre Container */
	.genre-container {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	/* Genre Header */
	.genre-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 32px;
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%);
		border-radius: 20px;
		border: 1px solid rgba(99, 102, 241, 0.2);
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.genre-icon {
		width: 64px;
		height: 64px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
	}

	.genre-header h1 {
		font-size: 28px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 4px;
	}

	.genre-header p {
		color: rgba(248, 250, 252, 0.6);
		font-size: 14px;
		margin: 0;
	}

	.result-count {
		padding: 10px 20px;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 20px;
		color: rgba(248, 250, 252, 0.8);
		font-size: 14px;
		font-weight: 500;
	}

	/* Anime Grid */
	.anime-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 24px;
	}

	.anime-card {
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		text-decoration: none;
		transition: all 0.3s ease;
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
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.anime-card:hover .card-overlay {
		opacity: 1;
	}

	.play-icon {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transform: scale(0.8);
		transition: transform 0.3s ease;
	}

	.anime-card:hover .play-icon {
		transform: scale(1);
	}

	.episode-badge {
		position: absolute;
		top: 10px;
		left: 10px;
		padding: 6px 12px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-radius: 20px;
		color: white;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
	}

	.card-content {
		padding: 16px;
	}

	.card-title {
		font-size: 14px;
		font-weight: 600;
		color: #f8fafc;
		margin: 0 0 8px;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.release-day {
		font-size: 12px;
		color: rgba(248, 250, 252, 0.5);
	}

	/* Pagination */
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16px;
		margin-top: 24px;
	}

	.page-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 12px;
		color: #818cf8;
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.page-btn:hover {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-color: transparent;
		color: white;
	}

	.page-numbers {
		display: flex;
		gap: 8px;
	}

	.page-num {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		color: rgba(248, 250, 252, 0.7);
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.page-num:hover {
		background: rgba(99, 102, 241, 0.15);
		border-color: rgba(99, 102, 241, 0.3);
		color: #818cf8;
	}

	.page-num.active {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-color: transparent;
		color: white;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: 80px 40px;
		color: rgba(248, 250, 252, 0.5);
	}

	.empty-state svg {
		margin-bottom: 16px;
	}

	/* Loading */
	.loading-container {
		text-align: center;
		padding: 100px 40px;
	}

	.loader {
		width: 50px;
		height: 50px;
		border: 3px solid rgba(99, 102, 241, 0.15);
		border-top-color: #6366f1;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 20px;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.loading-container p {
		color: rgba(248, 250, 252, 0.6);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.genre-page {
			padding: 100px 16px 100px;
		}

		.genre-header {
			flex-direction: column;
			gap: 16px;
			text-align: center;
			padding: 20px;
		}

		.header-content {
			flex-direction: column;
		}

		.genre-header h1 {
			font-size: 22px;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 16px;
		}

		.pagination {
			flex-wrap: wrap;
		}

		.page-numbers {
			order: 3;
			width: 100%;
			justify-content: center;
			margin-top: 12px;
		}
	}
</style>
