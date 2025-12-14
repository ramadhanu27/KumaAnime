<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import { watchHistory } from '$lib/stores/watchHistory';
	import { page } from '$app/stores';
	import { generateSafelinkUrl, SAFELINK_ENABLED } from '$lib/utils/safelink';

	export let data;

	// Generate safelink for download links
	function getSafelinkUrl(url: string, title: string): string {
		if (SAFELINK_ENABLED) {
			return generateSafelinkUrl(url, title);
		}
		return url;
	}

	$: episodeData = data.episodeData;
	$: error = data.error;

	let currentStreamUrl = '';
	let selectedQuality = '';
	let selectedServer = '';
	let showDownloadPanel = false;

	// Initialize default stream
	$: if (episodeData && !currentStreamUrl) {
		currentStreamUrl = episodeData.defaultStreamingUrl || '';
		// Set default quality and server
		if (episodeData.server?.qualities?.length > 0) {
			const defaultQuality = episodeData.server.qualities.find(q => q.title === '720p') 
				|| episodeData.server.qualities[episodeData.server.qualities.length - 1];
			selectedQuality = defaultQuality?.title || '';
			if (defaultQuality?.serverList?.length > 0) {
				selectedServer = defaultQuality.serverList[0].serverId;
			}
		}
	}

	// Save to watch history when episode loads
	$: if (episodeData && typeof window !== 'undefined') {
		const slug = $page.url.searchParams.get('slug') || '';
		watchHistory.add({
			slug: slug,
			title: episodeData.title,
			seriesName: episodeData.title.replace(/Episode.*$/i, '').trim(),
			episode: extractEpisodeNumber(episodeData.title),
			thumbnail: ''
		});
	}

	function extractEpisodeNumber(title: string): string {
		const match = title.match(/Episode\s*(\d+)/i);
		return match ? match[1] : '1';
	}

	async function changeServer(serverId: string) {
		selectedServer = serverId;
		try {
			const response = await fetch(`https://www.sankavollerei.com/anime/server/${serverId}`);
			if (response.ok) {
				const data = await response.json();
				if (data.data?.url) {
					currentStreamUrl = data.data.url;
				}
			}
		} catch (err) {
			console.error('Error changing server:', err);
		}
	}

	function selectQuality(quality: string) {
		selectedQuality = quality;
		const qualityData = episodeData?.server?.qualities?.find((q: { title: string }) => q.title === quality);
		if (qualityData?.serverList?.length > 0) {
			changeServer(qualityData.serverList[0].serverId);
		}
	}

	function toggleDownloadPanel() {
		showDownloadPanel = !showDownloadPanel;
	}

	function handleImageError(event: Event) {
		const img = event.target as HTMLImageElement;
		img.src = 'https://via.placeholder.com/400x225/1a1a2e/6366f1?text=No+Preview';
	}
</script>

<svelte:head>
	<title>{episodeData?.title || 'Watch'} - KumaStream</title>
	<meta name="description" content="Tonton {episodeData?.title || 'anime'} dengan subtitle Indonesia di KumaStream.">
</svelte:head>

<Header />
<Navigation />

<main class="watch-page">
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
	{:else if episodeData}
		<div class="watch-container">
			<!-- Video Player Section -->
			<div class="player-section">
				<div class="player-card">
					<div class="player-wrapper">
						{#if currentStreamUrl}
							<iframe
								title="Anime Player"
								src={currentStreamUrl}
								frameborder="0"
								allowfullscreen
								allow="autoplay; encrypted-media; fullscreen"
							></iframe>
						{:else}
							<div class="no-player">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/>
								</svg>
								<p>Streaming tidak tersedia</p>
							</div>
						{/if}
					</div>

					<!-- Episode Navigation -->
					<div class="episode-nav">
						{#if episodeData.hasPrevEpisode && episodeData.prevEpisode}
							<a href={`/watch?slug=${episodeData.prevEpisode.episodeId}`} class="nav-btn prev">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M19 12H5M12 19l-7-7 7-7"/>
								</svg>
								<span>Sebelumnya</span>
							</a>
						{:else}
							<div class="nav-btn disabled">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M19 12H5M12 19l-7-7 7-7"/>
								</svg>
								<span>Sebelumnya</span>
							</div>
						{/if}

						<a href={`/detail?slug=${episodeData.animeId}`} class="nav-btn home">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
								<polyline points="9 22 9 12 15 12 15 22"/>
							</svg>
							<span>Detail Anime</span>
						</a>

						{#if episodeData.hasNextEpisode && episodeData.nextEpisode}
							<a href={`/watch?slug=${episodeData.nextEpisode.episodeId}`} class="nav-btn next">
								<span>Selanjutnya</span>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M5 12h14M12 5l7 7-7 7"/>
								</svg>
							</a>
						{:else}
							<div class="nav-btn disabled">
								<span>Selanjutnya</span>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M5 12h14M12 5l7 7-7 7"/>
								</svg>
							</div>
						{/if}
					</div>
				</div>

				<!-- Quality & Server Selection -->
				{#if episodeData.server?.qualities?.length > 0}
					<div class="server-panel">
						<div class="panel-header">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
								<line x1="8" y1="21" x2="16" y2="21"/>
								<line x1="12" y1="17" x2="12" y2="21"/>
							</svg>
							<span>Pilih Server</span>
						</div>

						<!-- Quality Tabs -->
						<div class="quality-tabs">
							{#each episodeData.server.qualities as quality}
								<button
									class="quality-tab"
									class:active={selectedQuality === quality.title}
									on:click={() => selectQuality(quality.title)}
								>
									{quality.title}
								</button>
							{/each}
						</div>

						<!-- Server List -->
						<div class="server-list">
							{#each episodeData.server.qualities as quality}
								{#if selectedQuality === quality.title}
									{#each quality.serverList as server}
										<button
											class="server-btn"
											class:active={selectedServer === server.serverId}
											on:click={() => changeServer(server.serverId)}
										>
											<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
												<polygon points="5 3 19 12 5 21 5 3"/>
											</svg>
											{server.title}
										</button>
									{/each}
								{/if}
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Info Sidebar -->
			<div class="info-sidebar">
				<!-- Episode Info -->
				<div class="info-card">
					<h1 class="episode-title">{episodeData.title}</h1>
					
					<div class="meta-tags">
						{#if episodeData.info?.type}
							<span class="meta-tag type">{episodeData.info.type}</span>
						{/if}
						{#if episodeData.info?.duration}
							<span class="meta-tag duration">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
								</svg>
								{episodeData.info.duration}
							</span>
						{/if}
						{#if episodeData.releaseTime}
							<span class="meta-tag release">{episodeData.releaseTime}</span>
						{/if}
					</div>

					<!-- Genres -->
					{#if episodeData.info?.genreList?.length > 0}
						<div class="genres-section">
							<div class="genres-list">
								{#each episodeData.info.genreList as genre}
									<span class="genre-tag">{genre.title}</span>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Download Button -->
					<button class="download-toggle" on:click={toggleDownloadPanel}>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
							<polyline points="7 10 12 15 17 10"/>
							<line x1="12" y1="15" x2="12" y2="3"/>
						</svg>
						{showDownloadPanel ? 'Sembunyikan Download' : 'Tampilkan Download'}
					</button>

					<!-- Download Panel -->
					{#if showDownloadPanel && episodeData.downloadUrl?.qualities?.length > 0}
						<div class="download-panel">
							{#each episodeData.downloadUrl.qualities as quality}
								<div class="download-quality-group">
									<div class="quality-header">
										<span class="quality-name">{quality.title}</span>
										<span class="quality-size">{quality.size}</span>
									</div>
									<div class="download-links">
										{#each quality.urls as link}
											<a href={getSafelinkUrl(link.url, `${episodeData.title} - ${quality.title} - ${link.title}`)} class="download-link">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
													<polyline points="7 10 12 15 17 10"/>
													<line x1="12" y1="15" x2="12" y2="3"/>
												</svg>
												{link.title}
											</a>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Episode List -->
				{#if episodeData.info?.episodeList?.length > 0}
					<div class="episodes-card">
						<h2 class="episodes-title">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
								<line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
							</svg>
							Daftar Episode
							<span class="episode-count">{episodeData.info.episodeList.length}</span>
						</h2>
						<div class="episodes-list">
							{#each episodeData.info.episodeList as episode}
								{@const isCurrent = episode.episodeId === $page.url.searchParams.get('slug')}
								<a 
									href={`/watch?slug=${episode.episodeId}`} 
									class="episode-item"
									class:current={isCurrent}
								>
									<div class="ep-number">
										{#if isCurrent}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
												<polygon points="5 3 19 12 5 21 5 3"/>
											</svg>
										{:else}
											{episode.eps}
										{/if}
									</div>
									<div class="ep-info">
										<span class="ep-title">{episode.title}</span>
									</div>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
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
		padding: 100px 24px 40px;
		max-width: 1600px;
		margin: 0 auto;
	}

	/* Error Container */
	.error-container {
		text-align: center;
		padding: 60px 40px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 20px;
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

	/* Watch Container */
	.watch-container {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: 24px;
	}

	/* Player Section */
	.player-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

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
		justify-content: center;
		height: 100%;
		gap: 16px;
		color: rgba(248, 250, 252, 0.5);
	}

	/* Episode Navigation */
	.episode-nav {
		display: flex;
		justify-content: space-between;
		padding: 16px;
		background: rgba(0, 0, 0, 0.3);
		gap: 12px;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		color: #f8fafc;
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.nav-btn:hover:not(.disabled) {
		background: rgba(99, 102, 241, 0.2);
		border-color: rgba(99, 102, 241, 0.5);
		transform: translateY(-2px);
	}

	.nav-btn.home {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-color: transparent;
	}

	.nav-btn.home:hover {
		box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
	}

	.nav-btn.disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* Server Panel */
	.server-panel {
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		padding: 20px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.panel-header {
		display: flex;
		align-items: center;
		gap: 10px;
		color: #f8fafc;
		font-weight: 700;
		font-size: 15px;
		margin-bottom: 16px;
	}

	.panel-header svg {
		color: #818cf8;
	}

	.quality-tabs {
		display: flex;
		gap: 8px;
		margin-bottom: 16px;
		flex-wrap: wrap;
	}

	.quality-tab {
		padding: 10px 20px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: rgba(248, 250, 252, 0.7);
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.quality-tab:hover {
		background: rgba(99, 102, 241, 0.15);
		border-color: rgba(99, 102, 241, 0.4);
		color: #818cf8;
	}

	.quality-tab.active {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-color: transparent;
		color: white;
	}

	.server-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.server-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
		color: rgba(248, 250, 252, 0.8);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.server-btn:hover {
		background: rgba(16, 185, 129, 0.15);
		border-color: rgba(16, 185, 129, 0.4);
		color: #34d399;
	}

	.server-btn.active {
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-color: transparent;
		color: white;
	}

	/* Info Sidebar */
	.info-sidebar {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.info-card {
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 24px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.episode-title {
		font-size: 20px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 16px;
		line-height: 1.4;
	}

	.meta-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 16px;
	}

	.meta-tag {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 20px;
		color: #818cf8;
		font-size: 12px;
		font-weight: 600;
	}

	.meta-tag.type {
		background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
		color: white;
	}

	.meta-tag.release {
		background: rgba(16, 185, 129, 0.15);
		color: #34d399;
	}

	/* Genres */
	.genres-section {
		margin-bottom: 16px;
	}

	.genres-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.genre-tag {
		padding: 6px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		color: rgba(248, 250, 252, 0.8);
		font-size: 11px;
		font-weight: 500;
	}

	/* Download Toggle */
	.download-toggle {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 14px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border: none;
		border-radius: 12px;
		color: white;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.download-toggle:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
	}

	/* Download Panel */
	.download-panel {
		margin-top: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-height: 400px;
		overflow-y: auto;
	}

	.download-panel::-webkit-scrollbar {
		width: 6px;
	}

	.download-panel::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}

	.download-panel::-webkit-scrollbar-thumb {
		background: rgba(16, 185, 129, 0.4);
		border-radius: 10px;
	}

	.download-quality-group {
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
		padding: 14px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.quality-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.quality-name {
		font-size: 14px;
		font-weight: 700;
		color: #f8fafc;
	}

	.quality-size {
		font-size: 12px;
		padding: 4px 10px;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 20px;
		color: #818cf8;
		font-weight: 600;
	}

	.download-links {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.download-link {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		background: rgba(16, 185, 129, 0.15);
		border: 1px solid rgba(16, 185, 129, 0.3);
		border-radius: 8px;
		color: #34d399;
		text-decoration: none;
		font-size: 12px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.download-link:hover {
		background: #10b981;
		color: white;
		border-color: transparent;
	}

	/* Episodes Card */
	.episodes-card {
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 20px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.episodes-title {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 16px;
		font-weight: 700;
		color: #f8fafc;
		margin: 0 0 16px;
	}

	.episodes-title svg {
		color: #818cf8;
	}

	.episode-count {
		padding: 4px 10px;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 20px;
		color: #818cf8;
		font-size: 12px;
		font-weight: 700;
	}

	.episodes-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-height: 400px;
		overflow-y: auto;
	}

	.episodes-list::-webkit-scrollbar {
		width: 6px;
	}

	.episodes-list::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}

	.episodes-list::-webkit-scrollbar-thumb {
		background: rgba(99, 102, 241, 0.4);
		border-radius: 10px;
	}

	.episode-item {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 12px 14px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
		text-decoration: none;
		transition: all 0.3s ease;
		border: 1px solid transparent;
	}

	.episode-item:hover {
		background: rgba(99, 102, 241, 0.1);
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateX(4px);
	}

	.episode-item.current {
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
		border-color: rgba(99, 102, 241, 0.5);
	}

	.ep-number {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 10px;
		color: #818cf8;
		font-size: 14px;
		font-weight: 700;
		flex-shrink: 0;
	}

	.episode-item.current .ep-number {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
	}

	.ep-info {
		flex: 1;
		min-width: 0;
	}

	.ep-title {
		display: block;
		color: rgba(248, 250, 252, 0.9);
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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

	/* Mobile Responsive */
	@media (max-width: 1024px) {
		.watch-container {
			grid-template-columns: 1fr;
		}

		.info-sidebar {
			order: 2;
		}
	}

	@media (max-width: 768px) {
		.watch-page {
			padding: 80px 16px 100px;
		}

		.episode-nav {
			flex-wrap: wrap;
		}

		.nav-btn {
			flex: 1;
			min-width: calc(50% - 6px);
			justify-content: center;
			padding: 10px 12px;
			font-size: 12px;
		}

		.nav-btn.home {
			order: -1;
			flex-basis: 100%;
		}

		.nav-btn span {
			display: none;
		}

		.nav-btn.home span {
			display: inline;
		}

		.quality-tabs {
			overflow-x: auto;
			flex-wrap: nowrap;
			padding-bottom: 8px;
		}

		.quality-tab {
			flex-shrink: 0;
		}

		.server-list {
			gap: 6px;
		}

		.server-btn {
			padding: 8px 12px;
			font-size: 12px;
		}

		.episode-title {
			font-size: 18px;
		}
	}
</style>
