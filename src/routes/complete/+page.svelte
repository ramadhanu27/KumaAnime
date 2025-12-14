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

	function getScoreColor(score: string): string {
		const numScore = parseFloat(score);
		if (numScore >= 8) return '#10b981';
		if (numScore >= 7) return '#3b82f6';
		if (numScore >= 6) return '#f59e0b';
		return '#ef4444';
	}

	function handleImageError(event: Event) {
		const img = event.target as HTMLImageElement;
		img.src = 'https://via.placeholder.com/247x350/1a1a2e/6366f1?text=No+Image';
	}
</script>

<svelte:head>
	<title>Anime Complete - KumaStream</title>
	<meta name="description" content="Daftar anime yang sudah tamat/selesai. Tonton anime favorit dengan subtitle Indonesia.">
</svelte:head>

<Header />
<Navigation />

<main class="complete-page">
	<div class="page-header">
		<div class="header-icon">
			<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
				<polyline points="22 4 12 14.01 9 11.01"/>
			</svg>
		</div>
		<h1>Anime Complete</h1>
		<p class="subtitle">Daftar anime yang sudah tamat</p>
		<div class="stats-badge">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
				<polyline points="17 8 12 3 7 8"/>
				<line x1="12" y1="3" x2="12" y2="15"/>
			</svg>
			<span>{totalPages * 25}+ Anime</span>
		</div>
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
			{#each animeList as anime, index}
				<a href={`/detail?slug=${encodeURIComponent(anime.animeId)}`} class="anime-card" style="--delay: {index * 0.03}s">
					<div class="card-image">
						<img 
							src={anime.poster} 
							alt={anime.title}
							loading="lazy"
							on:error={handleImageError}
						/>
						<div class="card-overlay">
							<div class="play-button">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
									<polygon points="5 3 19 12 5 21 5 3"/>
								</svg>
							</div>
						</div>
						
						<!-- Episode Badge -->
						<span class="episode-badge">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
								<rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
								<polyline points="17 2 12 7 7 2"/>
							</svg>
							{anime.episodes} Eps
						</span>
						
						<!-- Score Badge -->
						<span class="score-badge" style="--score-color: {getScoreColor(anime.score)}">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
							</svg>
							{anime.score}
						</span>

						<!-- Complete Badge -->
						<span class="complete-badge">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Tamat
						</span>
					</div>
					<div class="card-content">
						<h3>{anime.title}</h3>
						<div class="card-meta">
							<span class="release-date">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
									<line x1="16" y1="2" x2="16" y2="6"/>
									<line x1="8" y1="2" x2="8" y2="6"/>
									<line x1="3" y1="10" x2="21" y2="10"/>
								</svg>
								{anime.lastReleaseDate}
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>

		<!-- Pagination -->
		<div class="pagination">
			<div class="pagination-controls">
				{#if hasPrevPage}
					<button class="pagination-btn" on:click={() => goToPage(1)} title="Halaman Pertama">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="11 17 6 12 11 7"/>
							<polyline points="18 17 13 12 18 7"/>
						</svg>
					</button>
					<button class="pagination-btn" on:click={() => goToPage(currentPage - 1)}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M19 12H5M12 19l-7-7 7-7"/>
						</svg>
						Sebelumnya
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
						Selanjutnya
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</button>
					<button class="pagination-btn" on:click={() => goToPage(totalPages)} title="Halaman Terakhir">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="13 17 18 12 13 7"/>
							<polyline points="6 17 11 12 6 7"/>
						</svg>
					</button>
				{/if}
			</div>
			
			<span class="page-info">Halaman {currentPage} dari {totalPages}</span>
		</div>
	{:else}
		<div class="empty-container">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/>
			</svg>
			<h3>Tidak ada anime</h3>
			<p>Tidak ditemukan anime complete saat ini</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.complete-page {
		min-height: 100vh;
		padding: 130px 24px 60px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		text-align: center;
		margin-bottom: 48px;
	}

	.header-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
		border-radius: 16px;
		color: white;
		margin-bottom: 20px;
		animation: iconPulse 2s infinite;
	}

	@keyframes iconPulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
		50% { box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
	}

	.page-header h1 {
		font-size: 36px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 8px;
	}

	.subtitle {
		color: rgba(248, 250, 252, 0.6);
		font-size: 16px;
		margin: 0 0 20px;
	}

	.stats-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: rgba(139, 92, 246, 0.15);
		border: 1px solid rgba(139, 92, 246, 0.3);
		border-radius: 25px;
		color: #a78bfa;
		font-size: 14px;
		font-weight: 600;
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

	/* Anime Grid */
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
		animation: cardFadeIn 0.4s ease forwards;
		animation-delay: var(--delay);
		opacity: 0;
	}

	@keyframes cardFadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.anime-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(139, 92, 246, 0.15);
		border-color: rgba(139, 92, 246, 0.4);
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
		background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.anime-card:hover .card-overlay {
		opacity: 1;
	}

	.play-button {
		width: 56px;
		height: 56px;
		background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transform: scale(0.8);
		transition: transform 0.3s ease;
		box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
	}

	.anime-card:hover .play-button {
		transform: scale(1);
	}

	.episode-badge {
		position: absolute;
		top: 12px;
		left: 12px;
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 6px 10px;
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		border-radius: 20px;
		color: white;
		font-size: 11px;
		font-weight: 700;
	}

	.score-badge {
		position: absolute;
		top: 12px;
		right: 12px;
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 6px 10px;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		border-radius: 20px;
		color: var(--score-color);
		font-size: 12px;
		font-weight: 700;
		border: 1px solid var(--score-color);
	}

	.complete-badge {
		position: absolute;
		bottom: 12px;
		left: 12px;
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 5px 10px;
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

	.card-content h3 {
		color: #f8fafc;
		font-size: 14px;
		font-weight: 600;
		margin: 0 0 10px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.4;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.release-date {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: rgba(248, 250, 252, 0.6);
		font-size: 12px;
		font-weight: 500;
	}

	/* Pagination */
	.pagination {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.pagination-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		background: rgba(139, 92, 246, 0.15);
		border: 1px solid rgba(139, 92, 246, 0.3);
		border-radius: 12px;
		color: #a78bfa;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.pagination-btn:hover {
		background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
		color: white;
		border-color: transparent;
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
	}

	.page-numbers {
		display: flex;
		gap: 6px;
	}

	.page-num {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: rgba(248, 250, 252, 0.7);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.page-num:hover {
		background: rgba(139, 92, 246, 0.2);
		border-color: rgba(139, 92, 246, 0.4);
		color: #a78bfa;
	}

	.page-num.active {
		background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
		border-color: transparent;
		color: white;
		box-shadow: 0 5px 15px rgba(139, 92, 246, 0.4);
	}

	.page-info {
		color: rgba(248, 250, 252, 0.5);
		font-size: 14px;
		font-weight: 500;
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
		margin: 0;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.complete-page {
			padding: 80px 16px 100px;
		}

		.page-header h1 {
			font-size: 28px;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 16px;
		}

		.card-content {
			padding: 12px;
		}

		.card-content h3 {
			font-size: 13px;
		}

		.pagination-controls {
			gap: 8px;
		}

		.pagination-btn {
			padding: 10px 14px;
			font-size: 13px;
		}

		.page-numbers {
			display: none;
		}
	}
</style>
