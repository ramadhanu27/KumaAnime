<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import Seo from '$lib/Seo.svelte';
	import { page } from '$app/stores';

	export let data;

	$: animeDetail = data.animeDetail;
	$: error = data.error;
	
	// Generate SEO data
	$: seoTitle = animeDetail ? `Nonton ${animeDetail.title} Sub Indo` : 'Detail Anime';
	$: seoDescription = animeDetail 
		? `Streaming dan download ${animeDetail.title} subtitle Indonesia. ${animeDetail.synopsis?.paragraphs?.[0]?.substring(0, 150) || `${animeDetail.type || 'Anime'} dengan ${animeDetail.episodes || '?'} episode.`}` 
		: 'Lihat detail anime lengkap di KumaStream';
	$: seoKeywords = animeDetail 
		? `${animeDetail.title}, nonton ${animeDetail.title}, download ${animeDetail.title}, ${animeDetail.title} sub indo, ${animeDetail.genreList?.map(g => g.title).join(', ') || ''}, streaming anime` 
		: '';
	$: seoImage = animeDetail?.poster || '/og-image.png';
	$: animeGenres = animeDetail?.genreList?.map(g => g.title) || [];
</script>

{#if animeDetail}
	<Seo 
		title={seoTitle}
		description={seoDescription}
		keywords={seoKeywords}
		image={seoImage}
		url={`/detail?slug=${$page.url.searchParams.get('slug')}`}
		type="video.other"
		animeData={{
			name: animeDetail.title,
			description: seoDescription,
			image: animeDetail.poster,
			genre: animeGenres,
			datePublished: animeDetail.aired,
			duration: animeDetail.duration
		}}
	/>
{:else}
	<Seo 
		title="Detail Anime - KumaStream"
		description="Lihat detail anime lengkap di KumaStream"
	/>
{/if}

<Header />
<Navigation />

<main class="detail-page">
	{#if error}
		<div class="error-container">
			<div class="error-icon">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
			</div>
			<h2>Oops! Terjadi Kesalahan</h2>
			<p>{error}</p>
			<a href="/" class="back-btn">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Kembali ke Beranda
			</a>
		</div>
	{:else if animeDetail}
		<div class="detail-container">
			<!-- Hero Section -->
			<div class="hero-section">
				<div class="hero-backdrop">
					<img src={animeDetail.poster} alt="" />
					<div class="hero-overlay"></div>
				</div>
				
				<div class="hero-content">
					<div class="anime-poster">
						<img 
							src={animeDetail.poster} 
							alt={animeDetail.title}
							on:error={(e) => {
								(e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/300x400/1a1a2e/6366f1?text=No+Image';
							}}
						/>
						<div class="poster-overlay">
							{#if animeDetail.score}
								<div class="rating-badge">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
									<span>{animeDetail.score}</span>
								</div>
							{/if}
						</div>
					</div>

					<div class="anime-info">
						<div class="anime-badges">
							{#if animeDetail.type}
								<span class="badge type-badge">{animeDetail.type}</span>
							{/if}
							{#if animeDetail.status}
								<span class="badge status-badge" class:ongoing={animeDetail.status?.toLowerCase().includes('ongoing')}>
									{animeDetail.status}
								</span>
							{/if}
						</div>

						<h1 class="anime-title">{animeDetail.title}</h1>
						
						{#if animeDetail.japanese}
							<p class="alternative-title">{animeDetail.japanese}</p>
						{/if}

						<!-- Quick Info -->
						<div class="quick-info">
							{#if animeDetail.episodes}
								<div class="info-chip">
									<svg class="chip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
									<span>{animeDetail.episodes} Episodes</span>
								</div>
							{/if}
							{#if animeDetail.duration}
								<div class="info-chip">
									<svg class="chip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
									<span>{animeDetail.duration}</span>
								</div>
							{/if}
							{#if animeDetail.aired}
								<div class="info-chip">
									<svg class="chip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
									<span>{animeDetail.aired}</span>
								</div>
							{/if}
							{#if animeDetail.studios}
								<div class="info-chip">
									<svg class="chip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/><path d="M1 21h22"/></svg>
									<span>{animeDetail.studios}</span>
								</div>
							{/if}
						</div>

						<!-- Genres -->
						{#if animeDetail.genreList && animeDetail.genreList.length > 0}
							<div class="genres-wrap">
								{#each animeDetail.genreList as genre}
									<a href={`/genre?id=${genre.genreId}`} class="genre-tag">{genre.title}</a>
								{/each}
							</div>
						{/if}

						<!-- Action Buttons -->
						<div class="action-buttons">
							{#if animeDetail.episodeList && animeDetail.episodeList.length > 0}
								<a href={`/watch?slug=${encodeURIComponent(animeDetail.episodeList[animeDetail.episodeList.length - 1].episodeId)}`} class="btn-primary">
									<svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
									<span>Tonton Episode 1</span>
								</a>
							{/if}
							{#if animeDetail.batch}
								<a href={`/batch?slug=${encodeURIComponent(animeDetail.batch.batchId)}`} class="btn-secondary btn-batch">
									<svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
									<span>Download Batch</span>
								</a>
							{/if}
							<button class="btn-secondary">
								<svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
								<span>Tambah ke List</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Content Section -->
			<div class="content-grid">
				<!-- Main Content -->
				<div class="main-content">
					<!-- Synopsis -->
					<div class="content-card">
						<h2 class="card-title">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
							Sinopsis
						</h2>
						{#if animeDetail.synopsis && animeDetail.synopsis.paragraphs && animeDetail.synopsis.paragraphs.length > 0}
							{#each animeDetail.synopsis.paragraphs as paragraph}
								<p class="synopsis-text">{paragraph}</p>
							{/each}
						{:else}
							<p class="synopsis-text">Sinopsis belum tersedia.</p>
						{/if}
						
						{#if animeDetail.synopsis && animeDetail.synopsis.connections && animeDetail.synopsis.connections.length > 0}
							<div class="connections-section">
								<h3 class="connections-title">Related Anime</h3>
								<div class="connections-list">
									{#each animeDetail.synopsis.connections as connection}
										<a href={`/detail?slug=${connection.animeId}`} class="connection-link">
											{connection.title}
										</a>
									{/each}
								</div>
							</div>
						{/if}
					</div>

					<!-- Episode List -->
					{#if animeDetail.episodeList && animeDetail.episodeList.length > 0}
						<div class="content-card">
							<h2 class="card-title">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
								Daftar Episode ({animeDetail.episodeList.length})
							</h2>
							<div class="episodes-grid">
								{#each animeDetail.episodeList as episode}
									<a href={`/watch?slug=${encodeURIComponent(episode.episodeId)}`} class="episode-card">
										<div class="episode-num">
											<span class="num">{episode.eps}</span>
										</div>
										<div class="episode-details">
											<span class="episode-name">{episode.title}</span>
											<span class="episode-date">{episode.date}</span>
										</div>
										<div class="episode-action">
											<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Recommended Anime -->
					{#if animeDetail.recommendedAnimeList && animeDetail.recommendedAnimeList.length > 0}
						<div class="content-card">
							<h2 class="card-title">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
								Rekomendasi Anime
							</h2>
							<div class="recommended-grid">
								{#each animeDetail.recommendedAnimeList as rec}
									<a href={`/detail?slug=${rec.animeId}`} class="recommended-card">
										<img src={rec.poster} alt={rec.title} loading="lazy" />
										<span class="recommended-title">{rec.title}</span>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- Sidebar -->
				<aside class="sidebar-content">
					<!-- Details Card -->
					<div class="content-card">
						<h2 class="card-title">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
							Detail Informasi
						</h2>
						<div class="detail-list">
							<div class="detail-item">
								<span class="detail-label">Type</span>
								<span class="detail-value">{animeDetail.type || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Episodes</span>
								<span class="detail-value">{animeDetail.episodes || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Status</span>
								<span class="detail-value">{animeDetail.status || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Aired</span>
								<span class="detail-value">{animeDetail.aired || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Duration</span>
								<span class="detail-value">{animeDetail.duration || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Studios</span>
								<span class="detail-value">{animeDetail.studios || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Producers</span>
								<span class="detail-value">{animeDetail.producers || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Score</span>
								<span class="detail-value rating">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
									{animeDetail.score || '-'}
								</span>
							</div>
						</div>
					</div>

					<!-- Genres Card (for sidebar) -->
					{#if animeDetail.genreList && animeDetail.genreList.length > 0}
						<div class="content-card">
							<h2 class="card-title">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
								Genres
							</h2>
							<div class="cast-grid">
								{#each animeDetail.genreList as genre}
									<a href={`/genre?id=${genre.genreId}`} class="cast-chip">
										{genre.title}
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</aside>
			</div>
		</div>
	{:else}
		<div class="loading-container">
			<div class="loader"></div>
			<p>Memuat detail anime...</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.detail-page {
		min-height: 100vh;
		background: #0f0f0f;
	}

	/* Error Container */
	.error-container {
		text-align: center;
		padding: 60px 40px;
		background: #18181b;
		border-radius: 8px;
		border: 1px solid #27272a;
		max-width: 500px;
		margin: 140px auto 40px;
	}

	.error-icon {
		color: #dc2626;
		margin-bottom: 20px;
	}

	.error-container h2 {
		color: #f4f4f5;
		font-size: 24px;
		margin: 0 0 12px;
	}

	.error-container p {
		color: #71717a;
		margin: 0 0 24px;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: #facc15;
		color: #0f0f0f;
		text-decoration: none;
		border-radius: 6px;
		font-weight: 600;
		transition: all 0.2s;
	}

	.back-btn:hover {
		background: #eab308;
	}

	/* Hero Section */
	.hero-section {
		position: relative;
		padding: 140px 24px 60px;
		margin-bottom: 40px;
	}

	.hero-backdrop {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.hero-backdrop img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: blur(30px) brightness(0.4);
		transform: scale(1.1);
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, 
			rgba(15, 15, 15, 0.5) 0%, 
			rgba(15, 15, 15, 0.8) 60%, 
			rgba(15, 15, 15, 1) 100%
		);
	}

	.hero-content {
		position: relative;
		z-index: 10;
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		gap: 40px;
		align-items: flex-start;
	}

	/* Poster */
	.anime-poster {
		flex-shrink: 0;
		width: 280px;
		position: relative;
	}

	.anime-poster img {
		width: 100%;
		border-radius: 6px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
	}

	.poster-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 16px;
	}

	.rating-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		color: #fbbf24;
		font-weight: 700;
		font-size: 15px;
	}

	/* Anime Info */
	.anime-info {
		flex: 1;
		padding-top: 20px;
	}

	.anime-badges {
		display: flex;
		gap: 10px;
		margin-bottom: 16px;
	}

	.badge {
		padding: 4px 10px;
		border-radius: 4px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.type-badge {
		background: #3b82f6;
		color: white;
	}

	.status-badge {
		background: #27272a;
		color: #a1a1aa;
		border: 1px solid #3f3f46;
	}

	.status-badge.ongoing {
		background: #22c55e;
		color: #fff;
		border-color: transparent;
	}

	.anime-title {
		font-size: 36px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 8px;
		line-height: 1.2;
	}

	.alternative-title {
		color: rgba(248, 250, 252, 0.5);
		font-size: 16px;
		font-style: italic;
		margin: 0 0 20px;
	}

	/* Quick Info */
	.quick-info {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-bottom: 20px;
	}

	.info-chip {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 4px;
		color: #a1a1aa;
		font-size: 13px;
	}

	.chip-icon {
		color: #71717a;
	}

	/* Genres */
	.genres-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 24px;
	}

	.genre-tag {
		padding: 5px 10px;
		background: #27272a;
		border: 1px solid #3f3f46;
		border-radius: 4px;
		color: #a1a1aa;
		font-size: 12px;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.2s;
	}

	.genre-tag:hover {
		background: #3f3f46;
		color: #f4f4f5;
	}

	/* Action Buttons */
	.action-buttons {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	.btn-primary, .btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		border: none;
		transition: all 0.2s;
	}

	.btn-primary {
		background: #facc15;
		color: #0f0f0f;
	}

	.btn-primary:hover {
		background: #eab308;
	}

	.btn-secondary {
		background: #27272a;
		color: #f4f4f5;
		border: 1px solid #3f3f46;
	}

	.btn-secondary:hover {
		background: #3f3f46;
	}

	/* Content Grid */
	.detail-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 360px;
		gap: 24px;
		padding: 0 24px 60px;
	}

	.main-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	/* Content Card */
	.content-card {
		background: #18181b;
		border-radius: 8px;
		padding: 24px;
		border: 1px solid #27272a;
	}

	.card-title {
		font-size: 16px;
		font-weight: 600;
		color: #f4f4f5;
		margin: 0 0 16px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.card-title svg {
		color: #71717a;
	}

	.synopsis-text {
		color: rgba(248, 250, 252, 0.7);
		font-size: 15px;
		line-height: 1.8;
		margin: 0;
	}

	/* Detail List */
	.detail-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		padding: 12px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.detail-item:last-child {
		border-bottom: none;
	}

	.detail-label {
		color: rgba(248, 250, 252, 0.5);
		font-size: 14px;
	}

	.detail-value {
		color: #f8fafc;
		font-size: 14px;
		font-weight: 500;
		text-align: right;
	}

	.detail-value.rating {
		display: flex;
		align-items: center;
		gap: 6px;
		color: #fbbf24;
	}

	/* Cast Grid */
	.cast-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.cast-chip {
		padding: 8px 14px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: rgba(248, 250, 252, 0.8);
		font-size: 13px;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.cast-chip:hover {
		background: rgba(99, 102, 241, 0.2);
		border-color: rgba(99, 102, 241, 0.4);
		color: #818cf8;
	}

	/* Episodes Grid */
	.episodes-grid {
		display: grid;
		gap: 10px;
	}

	.episode-card {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px;
		background: #27272a;
		border: 1px solid #3f3f46;
		border-radius: 6px;
		text-decoration: none;
		transition: all 0.2s;
	}

	.episode-card:hover {
		background: #3f3f46;
	}

	.episode-num {
		min-width: 40px;
		height: 40px;
		background: #facc15;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.episode-num .num {
		color: #0f0f0f;
		font-weight: 700;
		font-size: 14px;
	}

	.episode-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.episode-name {
		color: #f4f4f5;
		font-size: 13px;
		font-weight: 500;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.episode-date {
		color: #71717a;
		font-size: 11px;
	}

	.episode-action {
		width: 32px;
		height: 32px;
		background: #52525b;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #f4f4f5;
	}

	.episode-card:hover .episode-action {
		background: #facc15;
		color: #0f0f0f;
	}

	/* Connections Section */
	.connections-section {
		margin-top: 24px;
		padding-top: 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.connections-title {
		font-size: 14px;
		font-weight: 600;
		color: rgba(248, 250, 252, 0.7);
		margin: 0 0 12px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.connections-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.connection-link {
		padding: 8px 16px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 20px;
		color: #818cf8;
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.connection-link:hover {
		background: rgba(99, 102, 241, 0.25);
		border-color: rgba(99, 102, 241, 0.5);
		transform: translateY(-2px);
	}

	/* Recommended Anime Grid */
	.recommended-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 16px;
	}

	.recommended-card {
		display: flex;
		flex-direction: column;
		gap: 10px;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.recommended-card:hover {
		transform: translateY(-4px);
	}

	.recommended-card img {
		width: 100%;
		aspect-ratio: 3/4;
		object-fit: cover;
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		transition: box-shadow 0.3s ease;
	}

	.recommended-card:hover img {
		box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
	}

	.recommended-title {
		font-size: 12px;
		font-weight: 500;
		color: #f8fafc;
		text-align: center;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		transition: color 0.3s ease;
	}

	.recommended-card:hover .recommended-title {
		color: #818cf8;
	}

	/* Batch Download Button */
	.btn-batch {
		background: #22c55e;
		border-color: transparent;
		color: white;
	}

	.btn-batch:hover {
		background: #16a34a;
	}

	/* Genre Tag Link */
	.genre-tag {
		padding: 8px 16px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 20px;
		color: #818cf8;
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.genre-tag:hover {
		background: rgba(99, 102, 241, 0.25);
		border-color: rgba(99, 102, 241, 0.5);
		transform: translateY(-2px);
	}

	/* Loading */
	.loading-container {
		text-align: center;
		padding: 80px 40px;
		background: rgba(26, 26, 46, 0.8);
		border-radius: 20px;
		max-width: 400px;
		margin: 140px auto;
	}

	.loader {
		width: 48px;
		height: 48px;
		border: 3px solid rgba(99, 102, 241, 0.2);
		border-top-color: #6366f1;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 16px;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.loading-container p {
		color: rgba(248, 250, 252, 0.6);
		margin: 0;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.sidebar-content {
			order: -1;
		}
	}

	@media (max-width: 768px) {
		.hero-section {
			padding: 100px 16px 40px;
		}

		.hero-content {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.anime-poster {
			width: 200px;
		}

		.anime-info {
			padding-top: 0;
		}

		.anime-badges, .quick-info, .genres-wrap, .action-buttons {
			justify-content: center;
		}

		.anime-title {
			font-size: 26px;
		}

		.content-grid {
			padding: 0 16px 100px;
		}

		.content-card {
			padding: 20px;
		}
	}

	@media (max-width: 480px) {
		.anime-poster {
			width: 160px;
		}

		.anime-title {
			font-size: 22px;
		}

		.btn-primary, .btn-secondary {
			width: 100%;
			justify-content: center;
		}
	}
</style>
