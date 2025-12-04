<script lang="ts">
	export let anime: {
		title: string;
		thumb: string;
		slug: string;
		episode: string;
		type: string;
		date?: string;
	};
</script>

<article class="anime-card">
	<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`} class="card-link">
		<div class="card-image">
			<img
				src={anime.thumb}
				alt={anime.title}
				loading="lazy"
				on:error={(e) => {
					(e.currentTarget as HTMLImageElement).src =
						'https://via.placeholder.com/300x400/1a1a2e/6366f1?text=No+Image';
				}}
			/>
			<div class="card-overlay">
				<span class="play-icon">▶</span>
			</div>
			<div class="card-badges">
				<span class="badge-type">{anime.type}</span>
			</div>
			<div class="card-info">
				<span class="episode-badge">{anime.episode}</span>
			</div>
		</div>
		<div class="card-content">
			<h3 class="card-title">{anime.title}</h3>
			{#if anime.date}
				<p class="card-date">{anime.date}</p>
			{/if}
		</div>
	</a>
</article>

<style>
	.anime-card {
		position: relative;
		border-radius: 12px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.anime-card:hover {
		transform: translateY(-8px) scale(1.02);
		border-color: rgba(99, 102, 241, 0.4);
		box-shadow: 
			0 20px 40px rgba(0, 0, 0, 0.4),
			0 0 30px rgba(99, 102, 241, 0.2);
	}

	.card-link {
		display: block;
		text-decoration: none;
		color: inherit;
	}

	.card-image {
		position: relative;
		width: 100%;
		padding-top: 145%;
		overflow: hidden;
		background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
	}

	.card-image img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.anime-card:hover .card-image img {
		transform: scale(1.1);
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.3s ease;
	}

	.anime-card:hover .card-overlay {
		background: rgba(0, 0, 0, 0.5);
		opacity: 1;
	}

	.play-icon {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		color: white;
		transform: scale(0);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
		padding-left: 5px;
	}

	.anime-card:hover .play-icon {
		transform: scale(1);
	}

	.card-badges {
		position: absolute;
		top: 10px;
		left: 10px;
		display: flex;
		gap: 6px;
		z-index: 3;
	}

	.badge-type {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
		padding: 4px 10px;
		border-radius: 20px;
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 2px 10px rgba(99, 102, 241, 0.4);
	}

	.card-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 40px 12px 12px;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%);
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;
	}

	.episode-badge {
		background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
		color: white;
		padding: 4px 10px;
		border-radius: 20px;
		font-size: 11px;
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(236, 72, 153, 0.4);
	}

	.rating-badge {
		color: #fbbf24;
		font-size: 16px;
		filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
	}

	.card-content {
		padding: 14px;
		background: rgba(0, 0, 0, 0.2);
	}

	.card-title {
		font-size: 13px;
		font-weight: 600;
		line-height: 1.4;
		color: #f8fafc;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-align: center;
		transition: color 0.3s ease;
	}

	.anime-card:hover .card-title {
		color: #818cf8;
	}

	.card-date {
		font-size: 11px;
		color: rgba(248, 250, 252, 0.5);
		margin: 6px 0 0;
		text-align: center;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.play-icon {
			width: 50px;
			height: 50px;
			font-size: 20px;
		}

		.card-title {
			font-size: 12px;
		}

		.card-content {
			padding: 10px;
		}
	}

	@media (max-width: 480px) {
		.card-badges {
			top: 6px;
			left: 6px;
		}

		.badge-type {
			padding: 3px 8px;
			font-size: 9px;
		}

		.card-info {
			padding: 30px 8px 8px;
		}

		.episode-badge {
			padding: 3px 8px;
			font-size: 10px;
		}
	}
</style>
