<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;

	$: animeList = data.animeList;
	$: currentPage = data.currentPage;
	$: error = data.error;

	function goToPage(pageNum: number) {
		window.location.href = `/ongoing?page=${pageNum}`;
	}
</script>

<Header />
<Navigation />

<main class="ongoing-page">
	<div class="page-header">
		<div class="header-icon">
			<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polygon points="5 3 19 12 5 21 5 3"/>
			</svg>
		</div>
		<h1>Anime Ongoing</h1>
		<p>Daftar anime yang sedang berlangsung</p>
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
				<a href={`/watch?slug=${encodeURIComponent(anime.slug)}`} class="anime-card">
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
							<div class="play-button">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
									<polygon points="5 3 19 12 5 21 5 3"/>
								</svg>
							</div>
						</div>
						{#if anime.episode}
							<span class="episode-badge">{anime.episode}</span>
						{/if}
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
		<div class="pagination">
			{#if currentPage > 1}
				<button class="pagination-btn prev" on:click={() => goToPage(currentPage - 1)}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					Sebelumnya
				</button>
			{/if}
			
			<span class="page-info">Halaman {currentPage}</span>
			
			<button class="pagination-btn next" on:click={() => goToPage(currentPage + 1)}>
				Selanjutnya
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</button>
		</div>
	{:else}
		<div class="empty-container">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/>
			</svg>
			<h3>Tidak ada anime</h3>
			<p>Tidak ditemukan anime ongoing saat ini</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.ongoing-page {
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
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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

	.play-button {
		width: 56px;
		height: 56px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transform: scale(0.8);
		transition: transform 0.3s ease;
	}

	.anime-card:hover .play-button {
		transform: scale(1);
	}

	.episode-badge {
		position: absolute;
		top: 12px;
		left: 12px;
		padding: 6px 12px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-radius: 20px;
		color: white;
		font-size: 12px;
		font-weight: 700;
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

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;
	}

	.pagination-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 12px;
		color: #818cf8;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.pagination-btn:hover {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
		border-color: transparent;
	}

	.page-info {
		color: rgba(248, 250, 252, 0.6);
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

	@media (max-width: 768px) {
		.ongoing-page {
			padding: 80px 16px 100px;
		}

		.page-header h1 {
			font-size: 28px;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 16px;
		}

		.pagination {
			gap: 12px;
		}

		.pagination-btn {
			padding: 10px 16px;
			font-size: 13px;
		}
	}
</style>
