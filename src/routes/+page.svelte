<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import HeroSlider from '$lib/HeroSlider.svelte';
	import AnimeGrid from '$lib/AnimeGrid.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;
</script>

<svelte:head>
	<title>KumaStream - Nonton Anime Subtitle Indonesia</title>
	<meta name="description" content="Streaming dan download anime subtitle Indonesia gratis. Koleksi lengkap anime ongoing dan completed.">
</svelte:head>

<Header />
<Navigation />

<div class="page">
	<!-- Hero Slider -->
	<HeroSlider />

	<!-- Content -->
	<div class="content">
		<main>
			<AnimeGrid 
				animeList={data.ongoingAnime} 
				sectionTitle="Ongoing Anime" 
				viewAllHref={data.ongoingHref}
				type="ongoing" 
			/>
			
			<AnimeGrid 
				animeList={data.completedAnime} 
				sectionTitle="Completed Anime" 
				viewAllHref={data.completedHref}
				type="completed" 
			/>
		</main>

		<aside>
			<Sidebar />
		</aside>
	</div>
</div>

<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: #0f0f0f;
		color: #f4f4f5;
	}

	.page {
		max-width: 1400px;
		margin: 0 auto;
		padding: 120px 24px 40px;
	}

	.content {
		display: flex;
		gap: 32px;
		margin-top: 32px;
	}

	main {
		flex: 1;
		min-width: 0;
	}

	aside {
		width: 320px;
		flex-shrink: 0;
	}

	@media (max-width: 1200px) {
		aside {
			width: 280px;
		}
	}

	@media (max-width: 1024px) {
		.content {
			flex-direction: column;
		}

		aside {
			width: 100%;
		}
	}

	@media (max-width: 800px) {
		.page {
			padding: 72px 16px 80px;
		}

		.content {
			gap: 24px;
			margin-top: 24px;
		}
	}
</style>
