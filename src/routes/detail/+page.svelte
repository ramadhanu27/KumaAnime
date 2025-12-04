<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;

	$: animeDetail = data.animeDetail;
	$: error = data.error;
</script>

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
					<img src={animeDetail.thumb} alt="" />
					<div class="hero-overlay"></div>
				</div>
				
				<div class="hero-content">
					<div class="anime-poster">
						<img 
							src={animeDetail.thumb} 
							alt={animeDetail.title}
							on:error={(e) => {
								(e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/300x400/1a1a2e/6366f1?text=No+Image';
							}}
						/>
						<div class="poster-overlay">
							{#if animeDetail.rating}
								<div class="rating-badge">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
									<span>{animeDetail.rating}</span>
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
						
						{#if animeDetail.alternativeTitle}
							<p class="alternative-title">{animeDetail.alternativeTitle}</p>
						{/if}

						<!-- Quick Info -->
						<div class="quick-info">
							{#if animeDetail.totalEpisodes}
								<div class="info-chip">
									<svg class="chip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
									<span>{animeDetail.totalEpisodes} Episodes</span>
								</div>
							{/if}
							{#if animeDetail.duration}
								<div class="info-chip">
									<svg class="chip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
									<span>{animeDetail.duration}</span>
								</div>
							{/if}
							{#if animeDetail.season}
								<div class="info-chip">
									<svg class="chip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
									<span>{animeDetail.season}</span>
								</div>
							{/if}
							{#if animeDetail.studio}
								<div class="info-chip">
									<svg class="chip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/><path d="M1 21h22"/></svg>
									<span>{animeDetail.studio}</span>
								</div>
							{/if}
						</div>

						<!-- Genres -->
						{#if animeDetail.genres && animeDetail.genres.length > 0}
							<div class="genres-wrap">
								{#each animeDetail.genres as genre}
									<span class="genre-tag">{genre}</span>
								{/each}
							</div>
						{/if}

						<!-- Action Buttons -->
						{#if animeDetail.episodeList && animeDetail.episodeList.length > 0}
							<div class="action-buttons">
								<a href={`/watch?slug=${encodeURIComponent(animeDetail.episodeList[0].slug)}`} class="btn-primary">
									<svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
									<span>Tonton Sekarang</span>
								</a>
								<button class="btn-secondary">
									<svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
									<span>Tambah ke List</span>
								</button>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Content Section -->
			<div class="content-grid">
				<!-- Main Content -->
				<div class="main-content">
					<!-- Synopsis -->
					{#if animeDetail.synopsis}
						<div class="content-card">
							<h2 class="card-title">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
								Sinopsis
							</h2>
							<p class="synopsis-text">{animeDetail.synopsis}</p>
						</div>
					{/if}

					<!-- Episode List -->
					{#if animeDetail.episodeList && animeDetail.episodeList.length > 0}
						<div class="content-card">
							<h2 class="card-title">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
								Daftar Episode
							</h2>
							<div class="episodes-grid">
								{#each animeDetail.episodeList as episode}
									<a href={`/watch?slug=${encodeURIComponent(episode.slug)}`} class="episode-card">
										<div class="episode-num">
											<span class="num">{episode.episode}</span>
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
								<span class="detail-value">{animeDetail.totalEpisodes || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Status</span>
								<span class="detail-value">{animeDetail.status || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Released</span>
								<span class="detail-value">{animeDetail.released || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Season</span>
								<span class="detail-value">{animeDetail.season || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Duration</span>
								<span class="detail-value">{animeDetail.duration || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Studio</span>
								<span class="detail-value">{animeDetail.studio || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Producers</span>
								<span class="detail-value">{animeDetail.producers || '-'}</span>
							</div>
							<div class="detail-item">
								<span class="detail-label">Rating</span>
								<span class="detail-value rating">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
									{animeDetail.rating || '-'}
								</span>
							</div>
						</div>
					</div>

					<!-- Cast Card -->
					{#if animeDetail.cast && animeDetail.cast.length > 0}
						<div class="content-card">
							<h2 class="card-title">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
								Cast
							</h2>
							<div class="cast-grid">
								{#each animeDetail.cast as castMember}
									<a href={castMember.url} target="_blank" rel="noopener noreferrer" class="cast-chip">
										{castMember.name}
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
	}

	/* Error Container */
	.error-container {
		text-align: center;
		padding: 60px 40px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		max-width: 500px;
		margin: 140px auto 40px;
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
			rgba(15, 15, 35, 0.5) 0%, 
			rgba(15, 15, 35, 0.8) 60%, 
			rgba(15, 15, 35, 1) 100%
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
		border-radius: 16px;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
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
		padding: 6px 14px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.type-badge {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
	}

	.status-badge {
		background: rgba(100, 116, 139, 0.3);
		color: #94a3b8;
		border: 1px solid rgba(100, 116, 139, 0.3);
	}

	.status-badge.ongoing {
		background: rgba(16, 185, 129, 0.2);
		color: #34d399;
		border-color: rgba(16, 185, 129, 0.3);
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
		padding: 10px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: rgba(248, 250, 252, 0.8);
		font-size: 14px;
	}

	.chip-icon {
		color: #818cf8;
	}

	/* Genres */
	.genres-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 24px;
	}

	.genre-tag {
		padding: 8px 16px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 20px;
		color: #818cf8;
		font-size: 13px;
		font-weight: 500;
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
		gap: 10px;
		padding: 14px 28px;
		border-radius: 12px;
		font-size: 15px;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		border: none;
		transition: all 0.3s ease;
	}

	.btn-primary {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.08);
		color: #f8fafc;
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.12);
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
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 28px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.card-title {
		font-size: 18px;
		font-weight: 700;
		color: #f8fafc;
		margin: 0 0 20px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.card-title svg {
		color: #818cf8;
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
		gap: 16px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.episode-card:hover {
		background: rgba(99, 102, 241, 0.1);
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateX(4px);
	}

	.episode-num {
		min-width: 48px;
		height: 48px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.episode-num .num {
		color: white;
		font-weight: 700;
		font-size: 16px;
	}

	.episode-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.episode-name {
		color: #f8fafc;
		font-size: 14px;
		font-weight: 500;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.episode-date {
		color: rgba(248, 250, 252, 0.5);
		font-size: 12px;
	}

	.episode-action {
		width: 40px;
		height: 40px;
		background: rgba(99, 102, 241, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #818cf8;
	}

	.episode-card:hover .episode-action {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
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
