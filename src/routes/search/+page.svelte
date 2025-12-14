<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;

	$: searchResults = data.searchResults;
	$: searchQuery = data.searchQuery;
	$: error = data.error;
</script>

<Header />
<Navigation />

<main class="search-page">
	<div class="page-header">
		{#if searchQuery}
			<h1>Hasil Pencarian: "{searchQuery}"</h1>
		{/if}
		{#if searchResults && searchResults.length > 0}
			<span class="result-count">{searchResults.length} hasil ditemukan</span>
		{/if}
	</div>

	{#if error}
		<div class="error-container">
			<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
			</svg>
			<p>{error}</p>
		</div>
	{:else if searchResults && searchResults.length > 0}
		<div class="anime-grid">
			{#each searchResults as anime, index (anime.animeId + index)}
				<a href={`/detail?slug=${encodeURIComponent(anime.animeId)}`} class="anime-card">
					<div class="card-image">
						<img 
							src={anime.poster} 
							alt={anime.title}
							loading="lazy"
							on:error={(e) => {
								(e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/300x400/1a1a2e/6366f1?text=No+Image';
							}}
						/>
						<div class="card-overlay">
							<div class="play-button">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
									<polygon points="5 3 19 12 5 21 5 3"/>
								</svg>
							</div>
						</div>
						{#if anime.status}
							<span class="status-badge" class:ongoing={anime.status.toLowerCase().includes('ongoing')}>{anime.status}</span>
						{/if}
					</div>
					<div class="card-content">
						<h3>{anime.title}</h3>
					</div>
				</a>
			{/each}
		</div>
	{:else if searchQuery}
		<div class="empty-container">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="8" y1="11" x2="14" y2="11"/>
			</svg>
			<h3>Tidak ada hasil</h3>
			<p>Tidak ditemukan anime untuk "{searchQuery}"</p>
			<a href="/" class="back-btn">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Kembali ke Beranda
			</a>
		</div>
	{:else}
		<div class="empty-container">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
			</svg>
			<h3>Cari Anime</h3>
			<p>Masukkan kata kunci pencarian di kolom pencarian</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.search-page {
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

	.search-query {
		font-size: 20px;
		color: #818cf8;
		margin: 0 0 16px;
		font-weight: 500;
	}

	.result-count {
		display: inline-block;
		padding: 8px 20px;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 20px;
		color: #818cf8;
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
		font-size: 16px;
	}

	.anime-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 24px;
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

	.status-badge {
		position: absolute;
		top: 12px;
		left: 12px;
		padding: 6px 12px;
		background: rgba(100, 116, 139, 0.9);
		border-radius: 20px;
		color: white;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
	}

	.status-badge.ongoing {
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
	}

	.card-content {
		padding: 16px;
	}

	.card-content h3 {
		color: #f8fafc;
		font-size: 14px;
		font-weight: 600;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.4;
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

	@media (max-width: 768px) {
		.search-page {
			padding: 80px 16px 100px;
		}

		.page-header h1 {
			font-size: 28px;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 16px;
		}
	}
</style>
