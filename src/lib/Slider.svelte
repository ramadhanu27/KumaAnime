<script lang="ts">
	import { onMount } from 'svelte';

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

	let animeList: OngoingAnimeItem[] = [];
	const API_URL = 'https://www.sankavollerei.com/anime/home';

	onMount(async () => {
		try {
			const response = await fetch(API_URL);
			const data = await response.json();
			if (data.ok && data.data?.ongoing?.animeList) {
				animeList = data.data.ongoing.animeList.slice(0, 5);
				// Initialize Owl Carousel after data loads
				setTimeout(() => {
					initOwlCarousel();
				}, 100);
			}
		} catch (error) {
			console.error('Error loading slider data:', error);
		}
	});

	function initOwlCarousel() {
		const $ = (window as any).$;
		if ($) {
			$('.owl_carouselle').owlCarousel({
				loop: true,
				dots: true,
				autoplay: true,
				autoplayTimeout: 5000,
				items: 1,
				nav: true,
				navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
			});
		}
	}

	function handleImageError(event: Event) {
		const img = event.target as HTMLImageElement;
		img.src = 'https://via.placeholder.com/1000x290/18181b/facc15?text=No+Image';
	}
</script>

<!-- Slider Section -->
<div class="slider section">
	<div class="ct-wrapper">
		<div class="owl_carouselle owl-carousel owl-theme">
			{#each animeList as anime (anime.animeId)}
				<div class="slider-item">
					<div class="slider-wrapp">
						<div class="thumb overlay">
							<a href={`/detail/${encodeURIComponent(anime.animeId)}`}>
								<img
									src={anime.poster}
									alt={anime.title}
									on:error={handleImageError}
								/>
							</a>
						</div>
						<div class="covert">
							<a href={`/detail/${encodeURIComponent(anime.animeId)}`}>
								<img
									src={anime.poster}
									alt={anime.title}
									on:error={handleImageError}
								/>
							</a>
						</div>
						<div class="post-descript">
							<div class="post-title">
								<div class="right-title">
									<h2 class="post-titlenya">
										<a href={`/detail/${encodeURIComponent(anime.animeId)}`}>{anime.title}</a>
									</h2>
									<div class="post-tag">
										<span class="type-poss">{anime.releaseDay}</span>
										{#if anime.episodes}
											<span class="type-poss eps">{anime.episodes} Eps</span>
										{/if}
									</div>
								</div>
							</div>
							<div class="post-sinop">
								<strong>Latest Update</strong>
								<p>{anime.latestReleaseDate}</p>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	:global(.slider.section) {
		width: 100%;
	}

	.type-poss.eps {
		background: #22c55e;
	}
</style>
