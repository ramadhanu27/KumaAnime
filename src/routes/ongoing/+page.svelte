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
		window.location.href = `/ongoing?page=${pageNum}`;
	}
</script>

<Header />
<Navigation />

<main class="ongoing-page">
	<div class="section-header">
		<h2>Anime Ongoing</h2>
		<span class="subtitle">Daftar anime yang sedang berlangsung</span>
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
							on:error={(e) => {
								(e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/247x350/18181b/52525b?text=No+Image';
							}}
						/>
						<div class="card-overlay">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
								<polygon points="5 3 19 12 5 21 5 3"/>
							</svg>
						</div>
						{#if anime.episodes}
							<span class="episode-badge">EP {anime.episodes}</span>
						{/if}
						{#if anime.releaseDay}
							<span class="day-badge">{anime.releaseDay}</span>
						{/if}
					</div>
					<div class="card-content">
						<h3>{anime.title}</h3>
						{#if anime.latestReleaseDate}
							<span class="release-date">{anime.latestReleaseDate}</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>

		<!-- Pagination -->
		<div class="pagination">
			{#if hasPrevPage}
				<button class="pagination-btn" on:click={() => goToPage(currentPage - 1)}>
					« Sebelumnya
				</button>
			{/if}
			
			<span class="page-info">Halaman {currentPage} dari {totalPages}</span>
			
			{#if hasNextPage}
				<button class="pagination-btn" on:click={() => goToPage(currentPage + 1)}>
					Selanjutnya »
				</button>
			{/if}
		</div>
	{:else}
		<div class="empty-container">
			<h3>Tidak ada anime</h3>
			<p>Tidak ditemukan anime ongoing saat ini</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.ongoing-page {
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
		background: #dc2626;
		color: #fff;
		font-size: 10px;
		font-weight: 600;
		border-radius: 2px;
	}

	.day-badge {
		position: absolute;
		top: 8px;
		left: 8px;
		padding: 3px 8px;
		background: #3b82f6;
		color: #fff;
		font-size: 10px;
		font-weight: 600;
		border-radius: 2px;
		text-transform: uppercase;
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

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}

	.pagination-btn {
		padding: 10px 20px;
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

	@media (max-width: 768px) {
		.ongoing-page {
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

		.pagination {
			gap: 12px;
		}

		.pagination-btn {
			padding: 8px 14px;
			font-size: 12px;
		}
	}
</style>
