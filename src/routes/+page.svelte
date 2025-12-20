<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import HeroSlider from '$lib/HeroSlider.svelte';
	import AnimeGrid from '$lib/AnimeGrid.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';
	import Seo from '$lib/Seo.svelte';
	import { onMount } from 'svelte';

	export let data;

	// Client-side fallback jika server-side data kosong
	let ongoingAnime = $state(data.ongoingAnime || []);
	let completedAnime = $state(data.completedAnime || []);
	let loading = $state(false);
	let error = $state<string | null>(null);

	onMount(async () => {
		// Jika data dari server kosong, coba fetch dari client
		if (ongoingAnime.length === 0 || completedAnime.length === 0) {
			loading = true;
			try {
				const response = await fetch('https://www.sankavollerei.com/anime/home');
				if (!response.ok) throw new Error('Failed to fetch');
				
				const result = await response.json();
				ongoingAnime = result.data?.ongoing?.animeList || [];
				completedAnime = result.data?.completed?.animeList || [];
			} catch (err) {
				console.error('Client fetch error:', err);
				error = 'Gagal memuat data anime';
			} finally {
				loading = false;
			}
		}
	});
</script>

<Seo 
	title="KumaStream - Nonton Anime Sub Indo Gratis | Streaming & Download"
	description="KumaStream adalah situs streaming dan download anime subtitle Indonesia terlengkap. Nonton anime terbaru, ongoing, dan complete secara gratis dengan kualitas HD 720p 1080p."
	keywords="nonton anime, streaming anime, download anime, anime sub indo, anime subtitle indonesia, anime terbaru 2024, anime ongoing, anime batch download, kumastream, nonton anime gratis, anime lengkap"
	url="/"
	type="website"
/>

<Header />
<Navigation />

<div class="page">
	<!-- Hero Slider -->
	<HeroSlider />

	<!-- Content -->
	<div class="content">
		<main>
			{#if loading}
				<div class="loading">Loading...</div>
			{:else if error}
				<div class="error">{error}</div>
			{:else}
				<AnimeGrid 
					animeList={ongoingAnime} 
					sectionTitle="Ongoing Anime" 
					viewAllHref={data.ongoingHref}
					type="ongoing" 
				/>
				
				<AnimeGrid 
					animeList={completedAnime} 
					sectionTitle="Completed Anime" 
					viewAllHref={data.completedHref}
					type="completed" 
				/>
			{/if}
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

	.loading, .error {
		text-align: center;
		padding: 40px;
		color: #a1a1aa;
	}

	.error {
		color: #ef4444;
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
