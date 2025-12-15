<script lang="ts">
	interface OngoingAnimeItem {
		title: string;
		poster: string;
		episodes: number | null;
		releaseDay: string;
		latestReleaseDate: string;
		animeId: string;
		href: string;
		otakudesuUrl: string;
	}

	interface CompletedAnimeItem {
		title: string;
		poster: string;
		episodes: number;
		score: string;
		lastReleaseDate: string;
		animeId: string;
		href: string;
		otakudesuUrl: string;
	}

	type AnimeItem = OngoingAnimeItem | CompletedAnimeItem;

	export let anime: AnimeItem;
	export let type: 'ongoing' | 'completed' = 'ongoing';

	$: episodeText = anime.episodes ? `EP ${anime.episodes}` : 'Ongoing';
	$: dateText = type === 'ongoing' 
		? (anime as OngoingAnimeItem).latestReleaseDate 
		: (anime as CompletedAnimeItem).lastReleaseDate;
	$: releaseDay = type === 'ongoing' ? (anime as OngoingAnimeItem).releaseDay : null;
	$: score = type === 'completed' ? (anime as CompletedAnimeItem).score : null;
</script>

<article class="card">
	<a href={`/detail/${encodeURIComponent(anime.animeId)}`}>
		<div class="thumb">
			<img
				src={anime.poster}
				alt={anime.title}
				loading="lazy"
				on:error={(e) => {
					(e.currentTarget as HTMLImageElement).src =
						'https://via.placeholder.com/300x400/1a1a2e/666?text=No+Image';
				}}
			/>
			<div class="overlay">
				<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
					<polygon points="5 3 19 12 5 21 5 3"/>
				</svg>
			</div>
			{#if type === 'ongoing' && releaseDay}
				<span class="badge day">{releaseDay}</span>
			{:else if type === 'completed' && score}
				<span class="badge score">★ {score}</span>
			{/if}
			<div class="meta">
				<span class="ep">{episodeText}</span>
			</div>
		</div>
		<div class="info">
			<h3>{anime.title}</h3>
			{#if dateText}
				<span class="date">{dateText}</span>
			{/if}
		</div>
	</a>
</article>

<style>
	.card {
		background: #18181b;
		border-radius: 6px;
		overflow: hidden;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0,0,0,0.4);
	}

	.card a {
		display: block;
		text-decoration: none;
		color: inherit;
	}

	.thumb {
		position: relative;
		width: 100%;
		padding-top: 142%;
		background: #27272a;
		overflow: hidden;
	}

	.thumb img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s;
	}

	.card:hover .thumb img {
		transform: scale(1.05);
	}

	.overlay {
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

	.card:hover .overlay {
		opacity: 1;
	}

	.badge {
		position: absolute;
		top: 8px;
		left: 8px;
		padding: 3px 8px;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		border-radius: 2px;
		z-index: 2;
	}

	.badge.day {
		background: #3b82f6;
		color: #fff;
	}

	.badge.score {
		background: #facc15;
		color: #0f0f0f;
	}

	.meta {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 24px 8px 8px;
		background: linear-gradient(transparent, rgba(0,0,0,0.8));
		display: flex;
		justify-content: flex-start;
	}

	.ep {
		background: #dc2626;
		color: #fff;
		padding: 3px 8px;
		font-size: 10px;
		font-weight: 600;
		border-radius: 2px;
	}

	.info {
		padding: 12px;
	}

	.info h3 {
		font-size: 13px;
		font-weight: 500;
		color: #e4e4e7;
		margin: 0 0 4px;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card:hover .info h3 {
		color: #facc15;
	}

	.date {
		font-size: 11px;
		color: #71717a;
	}

	@media (max-width: 768px) {
		.info h3 {
			font-size: 12px;
		}

		.info {
			padding: 10px;
		}
	}
</style>
