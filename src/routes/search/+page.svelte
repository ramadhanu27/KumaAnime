<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import AnimeCard from '$lib/AnimeCard.svelte';

	export let data;

	$: searchResults = data.searchResults;
	$: searchQuery = data.searchQuery;
	$: error = data.error;
</script>

<Header />
<Navigation />

<div id="outer-wrapper">
	<!-- Content Wrapper -->
	<div id="content-wrapper">
		<!-- Main Content -->
		<div id="main-wrapper">
			<div class="bixbox">
				<div class="releases home">
					<h2>Hasil Pencarian: "{searchQuery}"</h2>
					{#if searchResults.length > 0}
						<span class="v1">{searchResults.length} hasil</span>
					{/if}
				</div>

				{#if error}
					<div class="error-message">
						<p>{error}</p>
					</div>
				{:else if searchResults.length > 0}
					<div id="content-wrap">
						<div class="blog-posts hfeed item">
							{#each searchResults as anime, index (anime.slug + index)}
								<AnimeCard {anime} />
							{/each}
						</div>
					</div>
				{:else}
					<div class="no-results">
						<p>Tidak ada hasil untuk "{searchQuery}"</p>
						<a href="/">Kembali ke Beranda</a>
					</div>
				{/if}
			</div>
		</div>

		<!-- Sidebar -->
		<div id="widget-kanan">
			<!-- Sidebar content can be added here -->
		</div>
	</div>
</div>

<Footer />

<style>
	.error-message {
		padding: 15px;
		background: #f8d7da;
		border: 1px solid #f5c6cb;
		border-radius: 4px;
		color: #721c24;
		margin-bottom: 15px;
	}

	.error-message p {
		margin: 0;
	}

	.no-results {
		padding: 40px 20px;
		text-align: center;
	}

	.no-results p {
		margin: 0 0 20px 0;
		color: #666;
		font-size: 16px;
	}

	.no-results a {
		display: inline-block;
		padding: 10px 20px;
		background: #0c70de;
		color: #fff;
		text-decoration: none;
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.no-results a:hover {
		background: #0a5ab8;
	}
</style>
