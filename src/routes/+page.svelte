<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import HeroSlider from '$lib/HeroSlider.svelte';
	import AnimeGrid from '$lib/AnimeGrid.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';

	export let data;

	let showPreloader = true;

	onMount(() => {
		setTimeout(() => {
			showPreloader = false;
		}, 500);
	});
</script>

<!-- Preloader -->
{#if showPreloader}
	<div class="preloader" id="preloader">
		<div class="loading">
			<div class="loader"></div>
			Loading...
		</div>
	</div>
{/if}

<Header />
<Navigation />

<!-- Main Container -->
<div class="main-container">
	<HeroSlider />

	<!-- Content Wrapper - Two Column Layout -->
	<div class="content-layout">
		<!-- Main Content - Left Side -->
		<main class="main-content">
			<AnimeGrid animeList={data.animeData} currentPage={data.currentPage} />
		</main>

		<!-- Sidebar - Right Side -->
		<aside class="sidebar-wrapper">
			<Sidebar />
		</aside>
	</div>
</div>

<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.main-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 90px 24px 24px;
	}

	.content-layout {
		display: flex;
		gap: 24px;
		margin-top: 24px;
	}

	.main-content {
		flex: 1;
		min-width: 0;
	}

	.sidebar-wrapper {
		width: 340px;
		flex-shrink: 0;
	}

	/* Responsive */
	@media (max-width: 1200px) {
		.sidebar-wrapper {
			width: 300px;
		}
	}

	@media (max-width: 1024px) {
		.content-layout {
			flex-direction: column;
		}

		.sidebar-wrapper {
			width: 100%;
		}
	}

	@media (max-width: 800px) {
		.main-container {
			padding: 80px 16px 16px;
		}

		.content-layout {
			gap: 16px;
		}
	}

	@media (max-width: 480px) {
		.main-container {
			padding: 70px 12px 12px;
		}
	}
</style>
