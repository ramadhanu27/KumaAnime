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

<article class="post-outer-container">
	<div class="thumbnail">
		<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`}>
			<img
				src={anime.thumb}
				alt={anime.title}
				on:error={(e) => {
					(e.currentTarget as HTMLImageElement).src =
						'https://via.placeholder.com/300x400/0c70de/ffffff?text=No+Image';
				}}
			/>
		</a>
		<div class="badge-type">{anime.type}</div>
		<div class="bt">
			<span class="tipeps">{anime.episode}</span>
			<span class="sub">
				<span class="rate-archive">★</span>
			</span>
		</div>
	</div>
	<h3 class="post-title entry-title">
		<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`}>{anime.title}</a>
	</h3>
</article>

<style>
	:global(article.post-outer-container) {
		overflow: hidden;
		transition: all 0.3s ease;
	}

	:global(article.post-outer-container:hover) {
		transform: translateY(-5px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	:global(.thumbnail) {
		width: 100%;
		padding-top: 150%;
		position: relative;
		overflow: hidden;
		border-radius: 4px;
		background: #f0f0f0;
	}

	:global(.thumbnail img) {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	:global(.thumbnail:hover img) {
		transform: scale(1.08);
	}

	:global(.badge-type) {
		position: absolute;
		top: 6px;
		left: 6px;
		background: rgba(12, 112, 222, 0.95);
		color: #fff;
		padding: 4px 8px;
		border-radius: 3px;
		font-size: 11px;
		font-weight: 600;
		z-index: 3;
		text-transform: uppercase;
	}

	:global(.bt) {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 8px;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
		z-index: 2;
	}

	:global(.tipeps) {
		font-size: 11px;
		background: rgba(12, 112, 222, 0.9);
		color: #fff;
		padding: 3px 6px;
		border-radius: 2px;
		font-weight: 600;
	}

	:global(.rate-archive) {
		color: #ffc107;
		font-size: 12px;
	}

	:global(h3.post-title) {
		font-size: 0.85em;
		margin: 6px 0;
		line-height: 1.2em;
		text-align: center;
		font-weight: 500;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: #333;
	}
</style>
