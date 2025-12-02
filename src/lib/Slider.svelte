<script lang="ts">
	import { onMount } from 'svelte';

	interface AnimeItem {
		title: string;
		thumb: string;
		slug: string;
		episode: string;
	}

	let animeList: AnimeItem[] = [];
	const API_BASE_URL = 'https://rdapi.up.railway.app/api/anime';

	onMount(async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/ongoing?page=1`);
			const data = await response.json();
			if (data.success && data.data) {
				animeList = data.data.slice(0, 5);
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
</script>

<!-- Slider Section -->
<div class="slider section">
	<div class="ct-wrapper">
		<div class="owl_carouselle owl-carousel owl-theme">
			{#each animeList as anime (anime.slug)}
				<div class="slider-item">
					<div class="slider-wrapp">
						<div class="thumb overlay">
							<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`}>
								<img
									src={anime.thumb}
									alt={anime.title}
									on:error={(e) => {
										e.currentTarget.src =
											'https://via.placeholder.com/1000x290/0c70de/ffffff?text=No+Image';
									}}
								/>
							</a>
						</div>
						<div class="covert">
							<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`}>
								<img
									src={anime.thumb}
									alt={anime.title}
									on:error={(e) => {
										e.currentTarget.src =
											'https://via.placeholder.com/125x180/0c70de/ffffff?text=No+Image';
									}}
								/>
							</a>
						</div>
						<div class="post-descript">
							<div class="post-title">
								<div class="right-title">
									<h2 class="post-titlenya">
										<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`}>{anime.title}</a>
									</h2>
									<div class="post-tag">
										<span class="type-poss">{anime.episode}</span>
									</div>
								</div>
							</div>
							<div class="post-sinop">
								<strong>Latest Episode</strong>
								<p>{anime.episode}</p>
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
</style>
