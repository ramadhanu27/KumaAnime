<script lang="ts">
	import { onMount } from 'svelte';

	interface HeroItem {
		title: string;
		thumb: string;
		status: string;
		type: string;
		description: string;
		genres: string[];
		slug: string;
	}

	let heroItems: HeroItem[] = [];
	let currentIndex = 0;
	let autoPlayInterval: ReturnType<typeof setInterval>;

	onMount(() => {
		loadHeroSlider();

		return () => {
			clearInterval(autoPlayInterval);
		};
	});

	async function loadHeroSlider() {
		try {
			const response = await fetch('https://rdapi.vercel.app/api/anime/ongoing?page=1');
			if (!response.ok) {
				throw new Error(`API error: ${response.status}`);
			}
			const data = await response.json();
			if (data.success && data.data && Array.isArray(data.data)) {
				// Ambil 5 anime pertama untuk hero slider
				heroItems = data.data.slice(0, 5).map((anime: any) => ({
					title: anime.title || 'Unknown',
					thumb: anime.thumb || 'https://via.placeholder.com/1200x400/0c70de/ffffff?text=No+Image',
					status: anime.status || 'Ongoing',
					type: anime.type || 'TV',
					description: anime.synopsis || 'Anime terbaru',
					genres: anime.genres || [],
					slug: anime.slug
				}));
			} else {
				console.warn('Invalid API response format:', data);
			}
		} catch (error) {
			console.error('Error loading hero slider:', error);
		}

		// Auto play - hanya jika ada items
		if (heroItems.length > 0) {
			autoPlayInterval = setInterval(() => {
				currentIndex = (currentIndex + 1) % heroItems.length;
			}, 5000);
		}
	}

	function goToSlide(index: number) {
		currentIndex = index;
		clearInterval(autoPlayInterval);
		autoPlayInterval = setInterval(() => {
			currentIndex = (currentIndex + 1) % heroItems.length;
		}, 5000);
	}
</script>

{#if heroItems.length > 0}
	<div class="hero-slider">
		<div class="hero-container">
			{#each heroItems as item, index (index)}
				<div class="hero-slide" class:active={index === currentIndex}>
					<div
						class="hero-background"
						style="background-image: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(12,112,222,0.3) 100%), url({item.thumb})"
					></div>

					<div class="hero-content">
						<div class="hero-text">
							<h1 class="hero-title">{item.title}</h1>

							<div class="hero-meta">
								<span class="status-badge ongoing">● {item.status}</span>
								<span class="type-badge">{item.type}</span>
							</div>

							<p class="hero-description">{item.description}</p>

							{#if item.genres && item.genres.length > 0}
								<div class="hero-genres">
									{#each item.genres.slice(0, 4) as genre}
										<span class="genre-badge">{genre}</span>
									{/each}
								</div>
							{/if}

							<div class="hero-buttons">
								<a href={`/detail?slug=${encodeURIComponent(item.slug)}`} class="btn btn-primary">
									Watch Now
								</a>
								<button class="btn btn-secondary">Bookmark</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Indicators -->
		<div class="hero-indicators">
			{#each heroItems as _, index (index)}
			<button
				class="indicator"
				class:active={index === currentIndex}
				on:click={() => goToSlide(index)}
				aria-label={`Go to slide ${index + 1}`}
			></button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.hero-slider {
		position: relative;
		width: 100%;
		height: 400px;
		overflow: hidden;
		background: #000;
		margin-top: 20px;
		margin-bottom: 30px;
	}

	.hero-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.hero-slide {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 0.8s ease-in-out;
	}

	.hero-slide.active {
		opacity: 1;
		z-index: 10;
	}

	.hero-background {
		position: absolute;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 40px;
	}

	.hero-text {
		max-width: 600px;
		color: #fff;
	}

	.hero-title {
		margin: 0 0 15px 0;
		font-size: 36px;
		font-weight: 700;
		line-height: 1.2;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
	}

	.hero-meta {
		display: flex;
		gap: 12px;
		margin-bottom: 15px;
		align-items: center;
	}

	.status-badge {
		display: inline-block;
		padding: 6px 12px;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.status-badge.ongoing {
		background: rgba(76, 175, 80, 0.9);
		color: #fff;
	}

	.type-badge {
		display: inline-block;
		padding: 6px 12px;
		background: rgba(12, 112, 222, 0.9);
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.hero-description {
		margin: 0 0 15px 0;
		font-size: 15px;
		line-height: 1.6;
		color: #e0e0e0;
		max-width: 500px;
	}

	.hero-genres {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 20px;
	}

	.genre-badge {
		display: inline-block;
		padding: 6px 12px;
		background: rgba(255, 255, 255, 0.15);
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 4px;
		font-size: 12px;
		font-weight: 500;
	}

	.hero-buttons {
		display: flex;
		gap: 12px;
	}

	.btn {
		padding: 12px 28px;
		border: none;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
		display: inline-block;
		text-align: center;
	}

	.btn-primary {
		background: #ffc107;
		color: #000;
	}

	.btn-primary:hover {
		background: #ffb300;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.4);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.6);
	}

	.hero-indicators {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 20;
		display: flex;
		gap: 8px;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.indicator.active {
		background: #ffc107;
		width: 32px;
		border-radius: 6px;
	}

	@media (max-width: 768px) {
		.hero-slider {
			height: 300px;
		}

		.hero-content {
			padding: 30px 20px;
		}

		.hero-title {
			font-size: 24px;
		}

		.hero-description {
			font-size: 14px;
		}

		.hero-buttons {
			flex-direction: column;
		}

		.btn {
			width: 100%;
		}
	}
</style>
