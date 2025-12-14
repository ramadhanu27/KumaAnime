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
				heroItems = data.data.slice(0, 5).map((anime: any) => ({
					title: anime.title || 'Unknown',
					thumb: anime.thumb || 'https://via.placeholder.com/1200x400/1a1a2e/ffffff?text=No+Image',
					status: anime.status || 'Ongoing',
					type: anime.type || 'TV',
					description: anime.synopsis || 'Anime terbaru',
					genres: anime.genres || [],
					slug: anime.slug
				}));
			}
		} catch (error) {
			console.error('Error loading hero slider:', error);
		}

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

	function nextSlide() {
		currentIndex = (currentIndex + 1) % heroItems.length;
	}

	function prevSlide() {
		currentIndex = currentIndex === 0 ? heroItems.length - 1 : currentIndex - 1;
	}
</script>

{#if heroItems.length > 0}
	<section class="hero">
		<div class="hero-track" style="transform: translateX(-{currentIndex * 100}%)">
			{#each heroItems as item, index (index)}
				<div class="hero-slide">
					<img src={item.thumb} alt={item.title} class="hero-bg" />
					<div class="hero-gradient"></div>
					<div class="hero-inner">
						<div class="hero-info">
							<div class="tags">
								<span class="tag ongoing">{item.status}</span>
								<span class="tag type">{item.type}</span>
							</div>
							<h2>{item.title}</h2>
							<p class="desc">{item.description}</p>
							{#if item.genres && item.genres.length > 0}
								<div class="genres">
									{#each item.genres.slice(0, 3) as genre}
										<span>{genre}</span>
									{/each}
								</div>
							{/if}
							<div class="actions">
								<a href={`/detail?slug=${encodeURIComponent(item.slug)}`} class="btn-watch">
									<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
										<polygon points="5 3 19 12 5 21 5 3"/>
									</svg>
									Watch Now
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Navigation Arrows -->
		<button class="nav-arrow prev" on:click={prevSlide} aria-label="Previous">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15 18 9 12 15 6"/>
			</svg>
		</button>
		<button class="nav-arrow next" on:click={nextSlide} aria-label="Next">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="9 18 15 12 9 6"/>
			</svg>
		</button>

		<!-- Dots -->
		<div class="dots">
			{#each heroItems as _, index (index)}
				<button
					class="dot"
					class:active={index === currentIndex}
					on:click={() => goToSlide(index)}
					aria-label={`Slide ${index + 1}`}
				></button>
			{/each}
		</div>
	</section>
{/if}

<style>
	.hero {
		position: relative;
		width: 100%;
		height: 420px;
		overflow: hidden;
		border-radius: 8px;
		background: #0f0f0f;
	}

	.hero-track {
		display: flex;
		height: 100%;
		transition: transform 0.5s ease;
	}

	.hero-slide {
		min-width: 100%;
		height: 100%;
		position: relative;
	}

	.hero-bg {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
	}

	.hero-inner {
		position: relative;
		z-index: 2;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 48px;
	}

	.hero-info {
		max-width: 520px;
	}

	.tags {
		display: flex;
		gap: 8px;
		margin-bottom: 12px;
	}

	.tag {
		padding: 4px 12px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		border-radius: 2px;
	}

	.tag.ongoing {
		background: #22c55e;
		color: #fff;
	}

	.tag.type {
		background: #3b82f6;
		color: #fff;
	}

	.hero-info h2 {
		font-size: 32px;
		font-weight: 700;
		color: #fff;
		margin: 0 0 12px;
		line-height: 1.2;
	}

	.desc {
		font-size: 14px;
		color: #a1a1aa;
		line-height: 1.6;
		margin: 0 0 16px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.genres {
		display: flex;
		gap: 8px;
		margin-bottom: 20px;
		flex-wrap: wrap;
	}

	.genres span {
		font-size: 12px;
		color: #d4d4d8;
		padding: 4px 10px;
		border: 1px solid #3f3f46;
		border-radius: 2px;
	}

	.actions {
		display: flex;
		gap: 12px;
	}

	.btn-watch {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: #facc15;
		color: #0f0f0f;
		font-weight: 600;
		font-size: 14px;
		text-decoration: none;
		border-radius: 4px;
		transition: background 0.2s;
	}

	.btn-watch:hover {
		background: #eab308;
	}

	/* Navigation Arrows */
	.nav-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 44px;
		height: 44px;
		background: rgba(0,0,0,0.5);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 4px;
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		transition: background 0.2s;
	}

	.nav-arrow:hover {
		background: rgba(0,0,0,0.7);
	}

	.nav-arrow svg {
		width: 20px;
		height: 20px;
	}

	.nav-arrow.prev {
		left: 16px;
	}

	.nav-arrow.next {
		right: 16px;
	}

	/* Dots */
	.dots {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 8px;
		z-index: 10;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255,255,255,0.3);
		border: none;
		cursor: pointer;
		padding: 0;
		transition: all 0.2s;
	}

	.dot.active {
		background: #facc15;
		width: 24px;
		border-radius: 4px;
	}

	@media (max-width: 768px) {
		.hero {
			height: 320px;
			border-radius: 0;
		}

		.hero-inner {
			padding: 0 24px;
		}

		.hero-info h2 {
			font-size: 22px;
		}

		.desc {
			font-size: 13px;
			-webkit-line-clamp: 2;
		}

		.nav-arrow {
			width: 36px;
			height: 36px;
		}

		.nav-arrow.prev {
			left: 8px;
		}

		.nav-arrow.next {
			right: 8px;
		}
	}
</style>
