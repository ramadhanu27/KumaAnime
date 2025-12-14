<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import { generateSafelinkUrl, SAFELINK_ENABLED, isOuoUrl, extractSafelinkPath, getOuoUrl } from '$lib/utils/safelink';
	import { onMount } from 'svelte';

	export let data;

	let origin = '';
	
	onMount(() => {
		origin = window.location.origin;
	});

	// Generate safelink for download links with ouo.io support
	function getSafelinkUrl(url: string, title: string): string {
		if (!SAFELINK_ENABLED) {
			return url;
		}
		
		const safelinkResult = generateSafelinkUrl(url, title);
		
		// Check if ouo.io is enabled and handle the URL
		if (isOuoUrl(safelinkResult) && origin) {
			const safelinkPath = extractSafelinkPath(safelinkResult);
			return getOuoUrl(safelinkPath, origin);
		}
		
		// If ouo.io is disabled or origin not ready, return regular safelink
		if (isOuoUrl(safelinkResult)) {
			return extractSafelinkPath(safelinkResult);
		}
		
		return safelinkResult;
	}

	$: batchData = data.batchData;
	$: error = data.error;

	let expandedFormat: number | null = 0;

	function toggleFormat(index: number) {
		expandedFormat = expandedFormat === index ? null : index;
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
		img.src = 'https://via.placeholder.com/300x420/1a1a2e/6366f1?text=No+Image';
	}
</script>

<svelte:head>
	<title>{batchData?.title ? `Download Batch ${batchData.title}` : 'Batch Download'} - KumaStream</title>
	<meta name="description" content="Download batch {batchData?.title || 'anime'} subtitle Indonesia. Unduh semua episode sekaligus.">
</svelte:head>

<Header />
<Navigation />

<main class="batch-page">
	{#if error}
		<div class="error-container">
			<div class="error-icon">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
			</div>
			<h2>Batch Tidak Ditemukan</h2>
			<p>{error}</p>
			<a href="/" class="back-btn">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Kembali ke Beranda
			</a>
		</div>
	{:else if batchData}
		<div class="batch-container">
			<!-- Anime Info Section -->
			<div class="anime-info-section">
				<div class="poster-wrapper">
					<img src={batchData.poster} alt={batchData.title} on:error={handleImageError} />
					<div class="poster-overlay">
						<span class="batch-badge">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
								<polyline points="7 10 12 15 17 10"/>
								<line x1="12" y1="15" x2="12" y2="3"/>
							</svg>
							BATCH
						</span>
					</div>
				</div>

				<div class="anime-details">
					<h1 class="anime-title">{batchData.title}</h1>
					
					{#if batchData.japanese}
						<p class="japanese-title">{batchData.japanese}</p>
					{/if}

					<div class="meta-badges">
						<span class="meta-badge type">{batchData.type}</span>
						<span class="meta-badge score" style="--score-color: {getScoreColor(batchData.score)}">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
							</svg>
							{batchData.score}
						</span>
						<span class="meta-badge episodes">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
								<rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
								<polyline points="17 2 12 7 7 2"/>
							</svg>
							{batchData.episodes} Episode
						</span>
					</div>

					<div class="info-grid">
						<div class="info-item">
							<span class="info-label">Durasi</span>
							<span class="info-value">{batchData.duration}</span>
						</div>
						<div class="info-item">
							<span class="info-label">Studio</span>
							<span class="info-value">{batchData.studios}</span>
						</div>
						<div class="info-item">
							<span class="info-label">Rilis</span>
							<span class="info-value">{batchData.aired}</span>
						</div>
						<div class="info-item">
							<span class="info-label">Credit</span>
							<span class="info-value">{batchData.credit}</span>
						</div>
					</div>

					{#if batchData.genreList?.length > 0}
						<div class="genres">
							{#each batchData.genreList as genre}
								<span class="genre-tag">{genre.title}</span>
							{/each}
						</div>
					{/if}

					<a href={`/detail?slug=${batchData.animeId}`} class="detail-link">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
							<circle cx="12" cy="12" r="3"/>
						</svg>
						Lihat Detail Anime
					</a>
				</div>
			</div>

			<!-- Download Section -->
			<div class="download-section">
				<div class="section-header">
					<h2>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
							<polyline points="7 10 12 15 17 10"/>
							<line x1="12" y1="15" x2="12" y2="3"/>
						</svg>
						Download Batch
					</h2>
					<p>Pilih kualitas dan server untuk mengunduh semua episode sekaligus</p>
				</div>

				{#if batchData.downloadUrl?.formats?.length > 0}
					<div class="formats-list">
						{#each batchData.downloadUrl.formats as format, formatIndex}
							<div class="format-card" class:expanded={expandedFormat === formatIndex}>
								<button class="format-header" on:click={() => toggleFormat(formatIndex)}>
									<div class="format-title">
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
											<polyline points="14 2 14 8 20 8"/>
											<line x1="16" y1="13" x2="8" y2="13"/>
											<line x1="16" y1="17" x2="8" y2="17"/>
										</svg>
										<span>{format.title}</span>
									</div>
									<div class="format-toggle">
										<span class="quality-count">{format.qualities.length} Kualitas</span>
										<svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<polyline points="6 9 12 15 18 9"/>
										</svg>
									</div>
								</button>

								{#if expandedFormat === formatIndex}
									<div class="format-content">
										{#each format.qualities as quality}
											<div class="quality-group">
												<div class="quality-header">
													<span class="quality-name">{quality.title}</span>
													<span class="quality-size">{quality.size}</span>
												</div>
												<div class="download-buttons">
													{#each quality.urls as link}
														<a href={getSafelinkUrl(link.url, `${batchData.title} Batch - ${format.title} - ${quality.title} - ${link.title}`)} class="download-btn">
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
						{/each}
					</div>
				{:else}
					<div class="no-downloads">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
						</svg>
						<p>Link download tidak tersedia</p>
					</div>
				{/if}
			</div>

			<!-- Note Section -->
			<div class="note-section">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
				<span>Jika link tidak berfungsi, silakan gunakan server alternatif lainnya</span>
			</div>
		</div>
	{:else}
		<div class="loading-container">
			<div class="loader"></div>
			<p>Memuat batch download...</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	.batch-page {
		min-height: 100vh;
		padding: 130px 24px 60px;
		max-width: 1200px;
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

	/* Batch Container */
	.batch-container {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	/* Anime Info Section */
	.anime-info-section {
		display: flex;
		gap: 32px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 24px;
		padding: 32px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.poster-wrapper {
		position: relative;
		width: 220px;
		flex-shrink: 0;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
	}

	.poster-wrapper img {
		width: 100%;
		height: auto;
		display: block;
	}

	.poster-overlay {
		position: absolute;
		top: 12px;
		left: 12px;
	}

	.batch-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
		border-radius: 20px;
		color: white;
		font-size: 12px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.anime-details {
		flex: 1;
	}

	.anime-title {
		font-size: 28px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 8px;
		line-height: 1.3;
	}

	.japanese-title {
		color: rgba(248, 250, 252, 0.5);
		font-size: 16px;
		margin: 0 0 20px;
	}

	.meta-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 24px;
	}

	.meta-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 20px;
		color: #818cf8;
		font-size: 13px;
		font-weight: 600;
	}

	.meta-badge.type {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
	}

	.meta-badge.score {
		color: var(--score-color);
		border: 1px solid var(--score-color);
		background: transparent;
	}

	.meta-badge.episodes {
		background: rgba(16, 185, 129, 0.15);
		color: #34d399;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
		margin-bottom: 20px;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.info-label {
		font-size: 12px;
		color: rgba(248, 250, 252, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.info-value {
		font-size: 14px;
		color: #f8fafc;
		font-weight: 500;
	}

	.genres {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 20px;
	}

	.genre-tag {
		padding: 6px 14px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		color: rgba(248, 250, 252, 0.8);
		font-size: 12px;
		font-weight: 500;
	}

	.detail-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 12px;
		color: #818cf8;
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.detail-link:hover {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-color: transparent;
		color: white;
	}

	/* Download Section */
	.download-section {
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 24px;
		padding: 32px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.section-header {
		margin-bottom: 24px;
	}

	.section-header h2 {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 24px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 8px;
	}

	.section-header h2 svg {
		color: #10b981;
	}

	.section-header p {
		color: rgba(248, 250, 252, 0.6);
		font-size: 14px;
		margin: 0;
	}

	/* Formats List */
	.formats-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.format-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 16px;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.format-card.expanded {
		border-color: rgba(16, 185, 129, 0.3);
		box-shadow: 0 10px 30px rgba(16, 185, 129, 0.1);
	}

	.format-header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 24px;
		background: transparent;
		border: none;
		color: #f8fafc;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.format-header:hover {
		background: rgba(255, 255, 255, 0.03);
	}

	.format-title {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 16px;
		font-weight: 700;
	}

	.format-title svg {
		color: #818cf8;
	}

	.format-toggle {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.quality-count {
		padding: 6px 12px;
		background: rgba(16, 185, 129, 0.15);
		border-radius: 20px;
		color: #34d399;
		font-size: 12px;
		font-weight: 600;
	}

	.chevron {
		color: rgba(248, 250, 252, 0.5);
		transition: transform 0.3s ease;
	}

	.format-card.expanded .chevron {
		transform: rotate(180deg);
	}

	.format-content {
		padding: 0 24px 24px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.quality-group {
		background: rgba(255, 255, 255, 0.02);
		border-radius: 12px;
		padding: 16px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.quality-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 14px;
	}

	.quality-name {
		font-size: 15px;
		font-weight: 700;
		color: #f8fafc;
	}

	.quality-size {
		padding: 5px 12px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 20px;
		color: white;
		font-size: 12px;
		font-weight: 700;
	}

	.download-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.download-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 10px 18px;
		background: rgba(16, 185, 129, 0.15);
		border: 1px solid rgba(16, 185, 129, 0.3);
		border-radius: 10px;
		color: #34d399;
		text-decoration: none;
		font-size: 13px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.download-btn:hover {
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-color: transparent;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
	}

	.no-downloads {
		text-align: center;
		padding: 60px 40px;
		color: rgba(248, 250, 252, 0.5);
	}

	.no-downloads svg {
		margin-bottom: 16px;
	}

	/* Note Section */
	.note-section {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 18px 24px;
		background: rgba(251, 191, 36, 0.1);
		border: 1px solid rgba(251, 191, 36, 0.2);
		border-radius: 12px;
		color: #fbbf24;
		font-size: 14px;
		text-align: center;
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
	@media (max-width: 768px) {
		.batch-page {
			padding: 80px 16px 100px;
		}

		.anime-info-section {
			flex-direction: column;
			padding: 20px;
		}

		.poster-wrapper {
			width: 100%;
			max-width: 200px;
			margin: 0 auto;
		}

		.anime-title {
			font-size: 22px;
			text-align: center;
		}

		.japanese-title {
			text-align: center;
		}

		.meta-badges {
			justify-content: center;
		}

		.info-grid {
			grid-template-columns: 1fr;
		}

		.genres {
			justify-content: center;
		}

		.detail-link {
			width: 100%;
			justify-content: center;
		}

		.download-section {
			padding: 20px;
		}

		.section-header h2 {
			font-size: 20px;
		}

		.format-header {
			padding: 16px;
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}

		.format-toggle {
			width: 100%;
			justify-content: space-between;
		}

		.format-content {
			padding: 0 16px 16px;
		}

		.download-buttons {
			gap: 8px;
		}

		.download-btn {
			flex: 1;
			min-width: calc(50% - 4px);
			justify-content: center;
			padding: 10px 12px;
			font-size: 12px;
		}
	}
</style>
