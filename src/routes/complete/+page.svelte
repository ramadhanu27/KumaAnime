<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;

	$: animeList = data.animeList;
	$: currentPage = data.currentPage;
	$: totalPages = data.totalPages;
	$: hasNextPage = data.hasNextPage;
	$: hasPrevPage = data.hasPrevPage;
	$: error = data.error;

	function goToPage(pageNum: number) {
		window.location.href = `/complete?page=${pageNum}`;
	}

	function handleImageError(event: Event) {
		const img = event.target as HTMLImageElement;
		img.src = 'https://via.placeholder.com/247x350/18181b/52525b?text=No+Image';
	}
</script>

<svelte:head>
	<title>Anime Complete - KumaStream</title>
	<meta name="description" content="Daftar anime yang sudah tamat/selesai. Tonton anime favorit dengan subtitle Indonesia.">
</svelte:head>

<Header />
<Navigation />

<main class="complete-page">
	<div class="section-header">
		<h2>Anime Complete</h2>
		<span class="subtitle">Daftar anime yang sudah tamat</span>
	</div>

	{#if error}
		<div class="error-container">
			<p>{error}</p>
		</div>
	{:else if animeList && animeList.length > 0}
		<div class="anime-grid">
			{#each animeList as anime}
				<a href={`/detail?slug=${encodeURIComponent(anime.animeId)}`} class="anime-card">
					<div class="card-image">
						<img 
							src={anime.poster} 
							alt={anime.title}
							loading="lazy"
							on:error={handleImageError}
						/>
						<div class="card-overlay">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
								<polygon points="5 3 19 12 5 21 5 3"/>
							</svg>
						</div>
						<span class="episode-badge">{anime.episodes} Eps</span>
						<span class="score-badge">★ {anime.score}</span>
					</div>
					<div class="card-content">
						<h3>{anime.title}</h3>
						<span class="release-date">{anime.lastReleaseDate}</span>
					</div>
				</a>
			{/each}
		</div>

		<!-- Pagination -->
		<div class="pagination">
			<div class="pagination-controls">
				{#if hasPrevPage}
					<button class="pagination-btn" on:click={() => goToPage(1)} title="Halaman Pertama">
						««
					</button>
					<button class="pagination-btn" on:click={() => goToPage(currentPage - 1)}>
						« Sebelumnya
					</button>
				{/if}
				
				<div class="page-numbers">
					{#each Array(Math.min(5, totalPages)) as _, i}
						{@const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i}
						{#if pageNum >= 1 && pageNum <= totalPages}
							<button 
								class="page-num" 
								class:active={pageNum === currentPage}
								on:click={() => goToPage(pageNum)}
							>
								{pageNum}
							</button>
						{/if}
					{/each}
				</div>
				
				{#if hasNextPage}
					<button class="pagination-btn" on:click={() => goToPage(currentPage + 1)}>
						Selanjutnya »
					</button>
					<button class="pagination-btn" on:click={() => goToPage(totalPages)} title="Halaman Terakhir">
						»»
					</button>
				{/if}
			</div>
			
			<span class="page-info">Halaman {currentPage} dari {totalPages}</span>
		</div>
	{:else}
		<div class="empty-container">
			<h3>Tidak ada anime</h3>
			<p>Tidak ditemukan anime complete saat ini</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.complete-page {
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

	/* Anime Grid */
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

	.card-content {
		padding: 12px;
	}

	.card-content h3 {
		color: #e4e4e7;
		font-size: 13px;
		font-weight: 500;
		margin: 0 0 4px;
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

	.release-date {
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
		gap: 8px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.pagination-btn {
		padding: 8px 14px;
		background: #27272a;
		border: 1px solid #3f3f46;
		border-radius: 6px;
		color: #a1a1aa;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.pagination-btn:hover {
		background: #3f3f46;
		color: #f4f4f5;
	}

	.page-numbers {
		display: flex;
		gap: 4px;
	}

	.page-num {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #27272a;
		border: 1px solid #3f3f46;
		border-radius: 6px;
		color: #a1a1aa;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.page-num:hover {
		background: #3f3f46;
		color: #f4f4f5;
	}

	.page-num.active {
		background: #facc15;
		border-color: #facc15;
		color: #0f0f0f;
	}

	.page-info {
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

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.complete-page {
			padding: 72px 16px 80px;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
			gap: 12px;
		}

		.card-content {
			padding: 10px;
		}

		.card-content h3 {
			font-size: 12px;
		}

		.pagination-controls {
			gap: 6px;
		}

		.pagination-btn {
			padding: 6px 10px;
			font-size: 12px;
		}

		.page-numbers {
			display: none;
		}
	}
</style>
