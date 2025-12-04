<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import { page } from '$app/stores';

	export let data;

	$: animeDetail = data.animeDetail;
	$: error = data.error;
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
	{:else if animeDetail}
		<div class="detail-container">
			<!-- Header Section -->
			<div class="detail-header">
				<div class="detail-cover">
					<img 
						src={animeDetail.thumb} 
						alt={animeDetail.title}
						on:error={(e) => {
							(e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/247x350/0c70de/ffffff?text=Tidak+Ada+Gambar';
						}}
					/>
				</div>

				<div class="detail-info">
					<h1>{animeDetail.title}</h1>
					{#if animeDetail.alternativeTitle}
						<p class="alternative-title">{animeDetail.alternativeTitle}</p>
					{/if}
					<div class="meta-info">
						<div class="meta-row">
							<div class="meta-item">
								<span class="label">Type:</span>
								<span class="value">{animeDetail.type || '-'}</span>
							</div>
							<div class="meta-item">
								<span class="label">Episodes:</span>
								<span class="value">{animeDetail.totalEpisodes || '-'}</span>
							</div>
							<div class="meta-item">
								<span class="label">Status:</span>
								<span class="value">{animeDetail.status || '-'}</span>
							</div>
						</div>
						<div class="meta-row">
							<div class="meta-item">
								<span class="label">Released:</span>
								<span class="value">{animeDetail.released || '-'}</span>
							</div>
							<div class="meta-item">
								<span class="label">Season:</span>
								<span class="value">{animeDetail.season || '-'}</span>
							</div>
							<div class="meta-item">
								<span class="label">Duration:</span>
								<span class="value">{animeDetail.duration || '-'}</span>
							</div>
						</div>
						<div class="meta-row">
							<div class="meta-item">
								<span class="label">Studio:</span>
								<span class="value">{animeDetail.studio || '-'}</span>
							</div>
							<div class="meta-item">
								<span class="label">Rating:</span>
								<span class="value rating">★ {animeDetail.rating || '-'}</span>
							</div>
							<div class="meta-item">
								<span class="label">Producers:</span>
								<span class="value">{animeDetail.producers || '-'}</span>
							</div>
						</div>
					</div>

					{#if animeDetail.genres && animeDetail.genres.length > 0}
						<div class="genres">
							{#each animeDetail.genres as genre}
								<span class="genre-tag">{genre}</span>
							{/each}
						</div>
					{/if}

					<!-- Cast Section -->
					{#if animeDetail.cast && animeDetail.cast.length > 0}
						<div class="cast-section-inline">
							<h3>Cast</h3>
							<div class="cast-list-inline">
								{#each animeDetail.cast as castMember}
									<a href={castMember.url} target="_blank" rel="noopener noreferrer" class="cast-item-inline">
										{castMember.name}
									</a>
								{/each}
							</div>
						</div>
					{/if}
					
					<!-- Synopsis -->
					{#if animeDetail.synopsis}
						<div class="synopsis-inline">
							<p>{animeDetail.synopsis}</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Episode List -->
			{#if animeDetail.episodeList && animeDetail.episodeList.length > 0}
				<div class="episode-section">
					<h2>Daftar Episode</h2>
					<div class="episode-list">
						{#each animeDetail.episodeList as episode}
							<a href={`/watch?slug=${encodeURIComponent(episode.slug)}`} class="episode-item">
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
			<p>⏳ Memuat detail anime...</p>
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

	.detail-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.detail-header {
		display: flex;
		gap: 30px;
		background: #fff;
		padding: 20px;
		border-radius: 4px;
		margin-bottom: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.detail-cover {
		flex-shrink: 0;
		width: 200px;
	}

	.detail-cover img {
		width: 100%;
		border-radius: 4px;
		object-fit: cover;
	}

	.detail-info {
		flex: 1;
	}

	.detail-info h1 {
		margin: 0 0 8px 0;
		font-size: 24px;
		color: #333;
	}

	.alternative-title {
		margin: 0 0 15px 0;
		font-size: 12px;
		color: #999;
		font-style: italic;
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

	.cast-section-inline {
		margin-top: 15px;
		padding-top: 15px;
		border-top: 1px solid #e0e0e0;
	}

	.cast-section-inline h3 {
		margin: 0 0 10px 0;
		font-size: 13px;
		font-weight: 600;
		color: #0c70de;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.cast-list-inline {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.cast-item-inline {
		padding: 6px 12px;
		background: #f0f0f0;
		color: #333;
		text-decoration: none;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 500;
		transition: all 0.3s ease;
		border: 1px solid #e0e0e0;
	}

	.cast-item-inline:hover {
		background: #0c70de;
		color: #fff;
		border-color: #0c70de;
	}

	.synopsis-inline {
		margin-top: 15px;
		padding-top: 15px;
		border-top: 1px solid #e0e0e0;
	}

	.synopsis-inline p {
		margin: 0;
		font-size: 14px;
		line-height: 1.6;
		color: #555;
	}


	.episode-section {
		background: #fff;
		padding: 20px;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.episode-section h2 {
		margin: 0 0 15px 0;
		font-size: 18px;
		color: #333;
	}

	.episode-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 12px;
	}

	.episode-item {
		padding: 12px;
		background: #f9f9f9;
		border: 1px solid #eee;
		border-radius: 4px;
		text-decoration: none;
		color: #333;
		transition: all 0.3s ease;
	}

	.episode-item:hover {
		background: #f0f0f0;
		border-color: #0c70de;
		transform: translateY(-2px);
	}

	.episode-number {
		font-weight: 600;
		color: #0c70de;
		font-size: 12px;
		margin-bottom: 6px;
	}

	.episode-title {
		font-size: 13px;
		line-height: 1.3;
		margin-bottom: 6px;
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
		padding: 40px;
		background: #fff;
		border-radius: 4px;
		margin: 20px;
	}

	@media screen and (max-width: 768px) {
		.detail-header {
			flex-direction: column;
			gap: 20px;
		}

		.detail-cover {
			width: 100%;
			max-width: 300px;
			margin: 0 auto;
		}

		.meta-info {
			grid-template-columns: 1fr;
		}

		.episode-list {
			grid-template-columns: 1fr;
		}
	}
</style>
