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
<div id="outer-wrapper">
	<HeroSlider />

	<!-- Content Wrapper -->
	<div id="content-wrapper">
		<!-- Main Content -->
		<div id="main-wrapper">
			<AnimeGrid animeList={data.animeData} currentPage={data.currentPage} />
		</div>

		<!-- Sidebar -->
		<Sidebar />
	</div>
</div>

<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(#outer-wrapper) {
		width: 100%;
	}
</style>
