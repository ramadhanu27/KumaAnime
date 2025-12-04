<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;

	$: episodeDetail = data.episodeDetail;
	$: error = data.error;

	let selectedStreamIndex = 0;
	let selectedDownloadIndex = 0;

	function getEpisodeNumber(title: string): string {
		const match = title.match(/Episode\s+(\d+)/i);
		return match ? `Episode ${match[1]}` : title;
	}
</script>

<Header />
<Navigation />

<div id="outer-wrapper" style="padding-top: 0;">
	{#if error}
		<div class="error-container">
			<h2>Kesalahan</h2>
			<p>{error}</p>
			<a href="/">← Kembali ke Beranda</a>
		</div>
	{:else if episodeDetail}
		<div class="watch-container">
			<!-- Player Section -->
			<div class="player-section">
				<div class="player-wrapper">
					{#if episodeDetail.streamingLinks && episodeDetail.streamingLinks.length > 0}
						<iframe
							title="Anime Player"
							src={episodeDetail.streamingLinks[selectedStreamIndex]?.url}
							width="100%"
							height="600"
							frameborder="0"
							allowfullscreen
							allow="autoplay; encrypted-media"
						></iframe>
					{:else}
						<div class="no-player">
							<i class="fa fa-video"></i>
							<p>Streaming tidak tersedia</p>
						</div>
					{/if}
				</div>

				<!-- Episode Info -->
				<div class="episode-info">
					<h1>{episodeDetail.title}</h1>
					<div class="series-info">
						<a href={`/detail?slug=anime${episodeDetail.seriesName.toLowerCase().replace(/\s+/g, '-')}`} class="series-link">
							← Kembali ke {episodeDetail.seriesName}
						</a>
					</div>

					<div class="meta-info">
						<div class="meta-row">
							<div class="meta-item">
								<span class="label">Episode:</span>
								<span class="value">{episodeDetail.episode}</span>
							</div>
							<div class="meta-item">
								<span class="label">Type:</span>
								<span class="value">{episodeDetail.type}</span>
							</div>
							<div class="meta-item">
								<span class="label">Status:</span>
								<span class="value">{episodeDetail.status}</span>
							</div>
						</div>
						<div class="meta-row">
							<div class="meta-item">
								<span class="label">Studio:</span>
								<span class="value">{episodeDetail.studio}</span>
							</div>
							<div class="meta-item">
								<span class="label">Rating:</span>
								<span class="value rating">★ {episodeDetail.rating}</span>
							</div>
							<div class="meta-item">
								<span class="label">Duration:</span>
								<span class="value">{episodeDetail.duration}</span>
							</div>
						</div>
					</div>

					{#if episodeDetail.genres && episodeDetail.genres.length > 0}
						<div class="genres">
							{#each episodeDetail.genres as genre}
								<span class="genre-tag">{genre}</span>
							{/each}
						</div>
					{/if}

					<!-- Streaming Sources -->
					{#if episodeDetail.streamingLinks && episodeDetail.streamingLinks.length > 0}
						<div class="sources-section">
							<h3>Sumber Streaming</h3>
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

					<!-- Download Links -->
					{#if episodeDetail.downloadLinks && episodeDetail.downloadLinks.length > 0}
						<div class="download-section">
							<h3>Download</h3>
							<div class="download-list">
								{#each episodeDetail.downloadLinks as link}
									<a href={link.url} target="_blank" rel="noopener noreferrer" class="download-btn">
										<i class="fa fa-download"></i>
										{link.host} - {link.quality}
									</a>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Synopsis -->
					{#if episodeDetail.synopsis}
						<div class="synopsis-section">
							<h3>Sinopsis</h3>
							<p>{episodeDetail.synopsis}</p>
						</div>
					{/if}

					<!-- Cast -->
					{#if episodeDetail.cast && episodeDetail.cast.length > 0}
						<div class="cast-section">
							<h3>Cast</h3>
							<div class="cast-list">
								{#each episodeDetail.cast as castMember}
									<a href={castMember.url} target="_blank" rel="noopener noreferrer" class="cast-item">
										{castMember.name}
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>

			<!-- Episode List -->
			{#if episodeDetail.episodeList && episodeDetail.episodeList.length > 0}
				<div class="episodes-section">
					<h2>Daftar Episode</h2>
					<div class="episodes-grid">
						{#each episodeDetail.episodeList as episode}
							<a href={`/watch?slug=${encodeURIComponent(episode.slug)}`} class="episode-card">
								<div class="episode-number">Ep {episode.episode}</div>
								<div class="episode-title">{episode.title}</div>
								<div class="episode-date">{episode.date}</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="loading-container">
			<p>⏳ Memuat episode...</p>
		</div>
	{/if}
</div>

<Footer />

<style>
	.error-container {
		max-width: 1200px;
		margin: 40px auto;
		padding: 20px;
		background: #fff;
		border-radius: 4px;
		text-align: center;
	}

	.error-container a {
		display: inline-block;
		margin-top: 20px;
		padding: 10px 20px;
		background: #0c70de;
		color: #fff;
		border-radius: 4px;
		text-decoration: none;
	}

	.watch-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.player-section {
		background: #fff;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		margin-bottom: 30px;
		overflow: hidden;
	}

	.player-wrapper {
		width: 100%;
		background: #000;
		aspect-ratio: 16 / 9;
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
		justify-content: center;
		width: 100%;
		height: 100%;
		color: #999;
		gap: 10px;
	}

	.no-player i {
		font-size: 48px;
	}

	.episode-info {
		padding: 30px;
	}

	.episode-info h1 {
		margin: 0 0 15px 0;
		font-size: 28px;
		color: #333;
	}

	.series-info {
		margin-bottom: 20px;
	}

	.series-link {
		color: #0c70de;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.series-link:hover {
		color: #0a5ab8;
	}

	.meta-info {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 20px;
	}

	.meta-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15px;
		padding: 12px;
		background: #f9f9f9;
		border-radius: 4px;
		border-left: 3px solid #0c70de;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
	}

	.meta-item .label {
		font-weight: 600;
		color: #0c70de;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.meta-item .value {
		color: #333;
		font-size: 14px;
		margin-top: 4px;
		font-weight: 500;
	}

	.meta-item .rating {
		color: #ffc107;
		font-weight: 600;
	}

	.genres {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 20px;
	}

	.genre-tag {
		background: #f0f0f0;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 12px;
		color: #333;
	}

	.sources-section,
	.download-section,
	.synopsis-section,
	.cast-section {
		margin-bottom: 25px;
		padding-bottom: 20px;
		border-bottom: 1px solid #e0e0e0;
	}

	.sources-section h3,
	.download-section h3,
	.synopsis-section h3,
	.cast-section h3 {
		margin: 0 0 15px 0;
		font-size: 16px;
		font-weight: 600;
		color: #333;
	}

	.sources-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.source-btn {
		padding: 10px 16px;
		background: #f0f0f0;
		border: 2px solid #e0e0e0;
		border-radius: 4px;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: #333;
		transition: all 0.3s ease;
	}

	.source-btn:hover {
		background: #e0e0e0;
		border-color: #0c70de;
	}

	.source-btn.active {
		background: #0c70de;
		color: #fff;
		border-color: #0c70de;
	}

	.download-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.download-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		background: #28a745;
		color: #fff;
		text-decoration: none;
		border-radius: 4px;
		font-size: 13px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.download-btn:hover {
		background: #218838;
		transform: translateY(-2px);
	}

	.synopsis-section p {
		margin: 0;
		font-size: 14px;
		line-height: 1.6;
		color: #555;
	}

	.cast-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.cast-item {
		padding: 8px 12px;
		background: #f0f0f0;
		color: #333;
		text-decoration: none;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 500;
		transition: all 0.3s ease;
		border: 1px solid #e0e0e0;
	}

	.cast-item:hover {
		background: #0c70de;
		color: #fff;
		border-color: #0c70de;
	}

	.episodes-section {
		background: #fff;
		padding: 30px;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.episodes-section h2 {
		margin: 0 0 20px 0;
		font-size: 20px;
		color: #333;
	}

	.episodes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 15px;
	}

	.episode-card {
		padding: 15px;
		background: #f9f9f9;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		text-decoration: none;
		color: #333;
		transition: all 0.3s ease;
	}

	.episode-card:hover {
		background: #f0f0f0;
		border-color: #0c70de;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(12, 112, 222, 0.1);
	}

	.episode-number {
		font-weight: 600;
		color: #0c70de;
		font-size: 13px;
		margin-bottom: 8px;
	}

	.episode-title {
		font-size: 13px;
		line-height: 1.4;
		margin-bottom: 8px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.episode-date {
		font-size: 11px;
		color: #999;
	}

	.loading-container {
		text-align: center;
		padding: 60px 20px;
		background: #fff;
		border-radius: 4px;
		margin: 20px;
	}

	@media screen and (max-width: 768px) {
		.player-wrapper {
			aspect-ratio: 16 / 9;
		}

		.episode-info {
			padding: 20px;
		}

		.episode-info h1 {
			font-size: 22px;
		}

		.meta-row {
			grid-template-columns: 1fr;
		}

		.episodes-grid {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		}

		.episodes-section {
			padding: 20px;
		}
	}
</style>
