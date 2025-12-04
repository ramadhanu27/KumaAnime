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

<div id="outer-wrapper">
	<div class="page-container">
		<div class="page-header">
			<h1>Anime Ongoing</h1>
			<p>Daftar anime yang sedang berlangsung</p>
		</div>

		{#if error}
			<div class="error-container">
				<p>⚠️ {error}</p>
			</div>
		{:else if animeList && animeList.length > 0}
			<div class="anime-grid">
				{#each animeList as anime}
					<a href={`/watch?slug=${encodeURIComponent(anime.slug)}`} class="anime-card">
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
							<div class="anime-meta">
								<span class="episode">{anime.episode}</span>
								<span class="type">{anime.type}</span>
							</div>
						</div>
					</a>
				{/each}
			</div>

			<!-- Pagination Navigation -->
			<div class="pagination-nav">
				{#if currentPage > 1}
					<button class="pagination-btn" on:click={() => goToPage(currentPage - 1)}>
						‹ Halaman Sebelumnya
					</button>
				{/if}
				<span class="page-info">Halaman {currentPage}</span>
				<button class="pagination-btn" on:click={() => goToPage(currentPage + 1)}>
					Halaman Selanjutnya ›
				</button>
			</div>
		{:else}
			<div class="empty-container">
				<p>📭 Tidak ada anime ongoing ditemukan</p>
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
		margin-bottom: 40px;
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

	.anime-meta {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.anime-meta span {
		font-size: 11px;
		padding: 4px 8px;
		background: #f0f0f0;
		border-radius: 3px;
		color: #666;
	}

	.anime-meta .episode {
		color: #0c70de;
		font-weight: 600;
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
		gap: 20px;
		margin-bottom: 20px;
		flex-wrap: wrap;
	}

	.page-info {
		color: #666;
		font-size: 14px;
		font-weight: 500;
	}

	.pagination-btn {
		padding: 10px 16px;
		background: #0c70de;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		color: #fff;
		transition: all 0.3s ease;
	}

	.pagination-btn:hover {
		background: #0a5ab8;
		transform: translateY(-2px);
	}

	@media screen and (max-width: 768px) {
		.page-header h1 {
			font-size: 24px;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			gap: 15px;
		}

		.pagination {
			gap: 4px;
		}

		.pagination-btn {
			padding: 8px 10px;
			font-size: 12px;
		}
	}
</style>
