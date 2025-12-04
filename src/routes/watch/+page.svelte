<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import { watchHistory } from '$lib/stores/watchHistory';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let data;

	$: episodeDetail = data.episodeDetail;
	$: error = data.error;

	let selectedStreamIndex = 0;
	let showMenu = false;

	// Save to watch history when episode loads
	$: if (episodeDetail && typeof window !== 'undefined') {
		watchHistory.add({
			slug: $page.url.searchParams.get('slug') || '',
			title: episodeDetail.title,
			seriesName: episodeDetail.seriesName,
			episode: episodeDetail.episode,
			thumbnail: episodeDetail.thumbnail || ''
		});
	}

	function getEpisodeNumber(title: string): string {
		const match = title.match(/Episode\s+(\d+)/i);
		return match ? `Episode ${match[1]}` : title;
	}

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function closeMenu() {
		showMenu = false;
	}
</script>

<Header />
<Navigation />

<main class="watch-page">
	{#if error}
		<div class="error-container">
			<div class="error-icon">⚠️</div>
			<h2>Oops! Terjadi Kesalahan</h2>
			<p>{error}</p>
			<a href="/" class="back-btn">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Kembali ke Beranda
			</a>
		</div>
	{:else if episodeDetail}
		<div class="watch-container">
			<!-- Video Player Section -->
			<div class="player-card">
				<div class="player-wrapper">
					{#if episodeDetail.streamingLinks && episodeDetail.streamingLinks.length > 0}
						<iframe
							title="Anime Player"
							src={episodeDetail.streamingLinks[selectedStreamIndex]?.url}
							frameborder="0"
							allowfullscreen
							allow="autoplay; encrypted-media"
						></iframe>
					{:else}
						<div class="no-player">
							<div class="no-player-icon"></div>
							<p>Streaming tidak tersedia</p>
						</div>
					{/if}

					<!-- Kebab Menu Button -->
					<button class="kebab-menu-btn" on:click={toggleMenu} aria-label="Menu">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<circle cx="12" cy="5" r="2"/>
							<circle cx="12" cy="12" r="2"/>
							<circle cx="12" cy="19" r="2"/>
						</svg>
					</button>

					<!-- Dropdown Menu -->
					{#if showMenu}
						<div class="menu-overlay" on:click={closeMenu} on:keydown={(e) => e.key === 'Escape' && closeMenu()} role="button" tabindex="0"></div>
						<div class="dropdown-menu">
							<div class="menu-header">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
								</svg>
								Opsi Video
							</div>
							
							{#if episodeDetail.streamingLinks && episodeDetail.streamingLinks.length > 0}
								<div class="menu-section">
									<div class="menu-section-title">
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
										</svg>
										Download / Streaming
									</div>
									<div class="menu-items">
										{#each episodeDetail.streamingLinks as stream}
											<a href={stream.url} target="_blank" rel="noopener noreferrer" class="menu-item" on:click={closeMenu}>
												<span class="download-host">{stream.source}</span>
												<span class="download-quality">{stream.quality}</span>
											</a>
										{/each}
									</div>
								</div>
							{:else}
								<div class="menu-empty">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
									</svg>
									<span>Download tidak tersedia</span>
								</div>
							{/if}

							<button class="menu-close-btn" on:click={closeMenu}>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
								</svg>
								Tutup
							</button>
						</div>
					{/if}
				</div>

				<!-- Streaming Sources -->
				{#if episodeDetail.streamingLinks && episodeDetail.streamingLinks.length > 0}
					<div class="sources-bar">
						<span class="sources-label">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
							Server:
						</span>
						<div class="sources-list">
							{#each episodeDetail.streamingLinks as link, index}
								<button
									class="source-btn"
									class:active={selectedStreamIndex === index}
									on:click={() => (selectedStreamIndex = index)}
								>
									{link.source} - {link.quality}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Episode Info Card -->
			<div class="info-card">
				<div class="info-header">
					<div class="episode-badge">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
						<span>Episode {episodeDetail.episode}</span>
					</div>
					<h1 class="episode-title">{episodeDetail.title}</h1>
					<a href={`/detail?slug=anime${episodeDetail.seriesName.toLowerCase().replace(/\s+/g, '-')}`} class="series-link">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M19 12H5M12 19l-7-7 7-7"/>
						</svg>
						Kembali ke {episodeDetail.seriesName}
					</a>
				</div>

				<!-- Meta Grid -->
				<div class="meta-grid">
					<div class="meta-item">
						<div class="meta-icon">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
						</div>
						<div class="meta-content">
							<span class="meta-label">Type</span>
							<span class="meta-value">{episodeDetail.type}</span>
						</div>
					</div>
					<div class="meta-item">
						<div class="meta-icon">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
						</div>
						<div class="meta-content">
							<span class="meta-label">Status</span>
							<span class="meta-value">{episodeDetail.status}</span>
						</div>
					</div>
					<div class="meta-item">
						<div class="meta-icon">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/><path d="M1 21h22"/><path d="M9 7h1"/><path d="M9 11h1"/><path d="M14 7h1"/><path d="M14 11h1"/></svg>
						</div>
						<div class="meta-content">
							<span class="meta-label">Studio</span>
							<span class="meta-value">{episodeDetail.studio}</span>
						</div>
					</div>
					<div class="meta-item">
						<div class="meta-icon star">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
						</div>
						<div class="meta-content">
							<span class="meta-label">Rating</span>
							<span class="meta-value rating">{episodeDetail.rating}</span>
						</div>
					</div>
					<div class="meta-item">
						<div class="meta-icon">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
						</div>
						<div class="meta-content">
							<span class="meta-label">Duration</span>
							<span class="meta-value">{episodeDetail.duration}</span>
						</div>
					</div>
				</div>

				<!-- Genres -->
				{#if episodeDetail.genres && episodeDetail.genres.length > 0}
					<div class="genres-section">
						<h3 class="section-title">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
							Genre
						</h3>
						<div class="genres-list">
							{#each episodeDetail.genres as genre}
								<span class="genre-tag">{genre}</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Download Links -->
				{#if episodeDetail.downloadLinks && episodeDetail.downloadLinks.length > 0}
					<div class="download-section">
						<h3 class="section-title">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
							Download
						</h3>
						<div class="download-grid">
							{#each episodeDetail.downloadLinks as link}
								<a href={link.url} target="_blank" rel="noopener noreferrer" class="download-btn">
									<div class="download-icon">
										<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
									</div>
									<span class="download-info">
										<span class="download-host">{link.host}</span>
										<span class="download-quality">{link.quality}</span>
									</span>
								</a>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Synopsis -->
				{#if episodeDetail.synopsis}
					<div class="synopsis-section">
						<h3 class="section-title">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
							Sinopsis
						</h3>
						<p class="synopsis-text">{episodeDetail.synopsis}</p>
					</div>
				{/if}
			</div>

			<!-- Episode List -->
			{#if episodeDetail.episodeList && episodeDetail.episodeList.length > 0}
				<div class="episodes-card">
					<h2 class="episodes-title">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
						Daftar Episode
					</h2>
					<div class="episodes-grid">
						{#each episodeDetail.episodeList as episode}
							<a href={`/watch?slug=${encodeURIComponent(episode.slug)}`} class="episode-item">
								<div class="episode-num">Ep {episode.episode}</div>
								<div class="episode-info">
									<span class="ep-title">{episode.title}</span>
									<span class="ep-date">{episode.date}</span>
								</div>
								<div class="episode-play">▶</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="loading-container">
			<div class="loader"></div>
			<p>Memuat episode...</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.watch-page {
		min-height: 100vh;
		padding: 130px 24px 40px;
		max-width: 1400px;
		margin: 0 auto;
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
		margin: 40px auto;
	}

	.error-icon {
		font-size: 64px;
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

	/* Watch Container */
	.watch-container {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	/* Player Card */
	.player-card {
		background: rgba(26, 26, 46, 0.9);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
	}

	.player-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: #000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.player-wrapper iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	.no-player {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		color: rgba(248, 250, 252, 0.5);
	}

	.no-player-icon {
		font-size: 64px;
	}

	/* Kebab Menu */
	.kebab-menu-btn {
		position: absolute;
		top: 16px;
		right: 16px;
		width: 40px;
		height: 40px;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: #f8fafc;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		z-index: 20;
	}

	.kebab-menu-btn:hover {
		background: rgba(99, 102, 241, 0.8);
		transform: scale(1.05);
	}

	.menu-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 90;
	}

	.dropdown-menu {
		position: absolute;
		top: 64px;
		right: 16px;
		width: 280px;
		background: rgba(26, 26, 46, 0.98);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		padding: 16px;
		z-index: 100;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
		animation: menuSlideIn 0.2s ease;
	}

	@keyframes menuSlideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.menu-header {
		display: flex;
		align-items: center;
		gap: 10px;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		margin-bottom: 12px;
		color: #f8fafc;
		font-weight: 700;
		font-size: 15px;
	}

	.menu-header svg {
		color: #818cf8;
	}

	.menu-section {
		margin-bottom: 12px;
	}

	.menu-section-title {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #10b981;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 10px;
	}

	.menu-items {
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-height: 200px;
		overflow-y: auto;
	}

	.menu-items::-webkit-scrollbar {
		width: 4px;
	}

	.menu-items::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}

	.menu-items::-webkit-scrollbar-thumb {
		background: rgba(99, 102, 241, 0.4);
		border-radius: 10px;
	}

	.menu-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.menu-item:hover {
		background: rgba(16, 185, 129, 0.15);
		border-color: rgba(16, 185, 129, 0.3);
	}

	.menu-item .download-host {
		color: #f8fafc;
		font-size: 13px;
		font-weight: 600;
	}

	.menu-item .download-quality {
		color: #10b981;
		font-size: 11px;
		font-weight: 700;
		padding: 3px 8px;
		background: rgba(16, 185, 129, 0.2);
		border-radius: 6px;
	}

	.menu-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 20px;
		color: rgba(248, 250, 252, 0.5);
		text-align: center;
	}

	.menu-empty span {
		font-size: 13px;
	}

	.menu-close-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px;
		background: rgba(244, 63, 94, 0.15);
		border: 1px solid rgba(244, 63, 94, 0.3);
		border-radius: 10px;
		color: #f43f5e;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 8px;
	}

	.menu-close-btn:hover {
		background: #f43f5e;
		color: white;
		border-color: transparent;
	}

	/* Sources Bar */
	.sources-bar {
		padding: 16px 24px;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}

	.sources-label {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #f8fafc;
		font-weight: 600;
		font-size: 14px;
	}

	.sources-label svg {
		color: #818cf8;
	}

	.sources-list {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.source-btn {
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: rgba(248, 250, 252, 0.8);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.source-btn:hover {
		background: rgba(99, 102, 241, 0.2);
		border-color: rgba(99, 102, 241, 0.5);
	}

	.source-btn.active {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-color: transparent;
		color: white;
	}

	/* Info Card */
	.info-card {
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 32px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.info-header {
		margin-bottom: 24px;
	}

	.episode-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
		border-radius: 20px;
		font-weight: 600;
		font-size: 14px;
		color: white;
		margin-bottom: 16px;
	}

	.episode-title {
		font-size: 28px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 12px;
		line-height: 1.3;
	}

	.series-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: #818cf8;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.series-link:hover {
		color: #a855f7;
	}

	/* Meta Grid */
	.meta-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 16px;
		margin-bottom: 24px;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.meta-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 10px;
		color: #818cf8;
		flex-shrink: 0;
	}

	.meta-icon.star {
		color: #fbbf24;
		background: rgba(251, 191, 36, 0.15);
	}

	.meta-content {
		display: flex;
		flex-direction: column;
	}

	.meta-label {
		font-size: 11px;
		color: rgba(248, 250, 252, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.meta-value {
		font-size: 15px;
		font-weight: 600;
		color: #f8fafc;
	}

	.meta-value.rating {
		color: #fbbf24;
	}

	/* Section Titles */
	.section-title {
		font-size: 16px;
		font-weight: 700;
		color: #f8fafc;
		margin: 0 0 16px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.section-title svg {
		color: #818cf8;
	}

	/* Genres */
	.genres-section {
		margin-bottom: 24px;
	}

	.genres-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.genre-tag {
		padding: 8px 16px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 20px;
		color: #818cf8;
		font-size: 13px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.genre-tag:hover {
		background: rgba(99, 102, 241, 0.25);
	}

	/* Download Section */
	.download-section {
		margin-bottom: 24px;
	}

	.download-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 12px;
	}

	.download-btn {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 18px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-radius: 12px;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.download-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
	}

	.download-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.download-info {
		display: flex;
		flex-direction: column;
	}

	.download-host {
		color: white;
		font-weight: 600;
		font-size: 14px;
	}

	.download-quality {
		color: rgba(255, 255, 255, 0.7);
		font-size: 12px;
	}

	/* Synopsis */
	.synopsis-section {
		margin-bottom: 0;
	}

	.synopsis-text {
		color: rgba(248, 250, 252, 0.7);
		font-size: 15px;
		line-height: 1.8;
		margin: 0;
	}

	/* Episodes Card */
	.episodes-card {
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 32px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.episodes-title {
		font-size: 20px;
		font-weight: 700;
		color: #f8fafc;
		margin: 0 0 24px;
	}

	.episodes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 12px;
	}

	.episode-item {
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

	.episode-item:hover {
		background: rgba(99, 102, 241, 0.1);
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateX(4px);
	}

	.episode-num {
		min-width: 50px;
		padding: 8px 12px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 8px;
		color: white;
		font-weight: 700;
		font-size: 12px;
		text-align: center;
	}

	.episode-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.ep-title {
		color: #f8fafc;
		font-size: 14px;
		font-weight: 500;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.ep-date {
		color: rgba(248, 250, 252, 0.5);
		font-size: 12px;
	}

	.episode-play {
		width: 36px;
		height: 36px;
		background: rgba(99, 102, 241, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #818cf8;
		font-size: 12px;
		transition: all 0.3s ease;
	}

	.episode-item:hover .episode-play {
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
		margin: 40px auto;
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
	@media (max-width: 768px) {
		.watch-page {
			padding: 80px 16px 100px;
		}

		.info-card, .episodes-card {
			padding: 24px;
		}

		.episode-title {
			font-size: 22px;
		}

		.meta-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.episodes-grid {
			grid-template-columns: 1fr;
		}

		.download-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.meta-grid {
			grid-template-columns: 1fr;
		}

		.sources-bar {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
