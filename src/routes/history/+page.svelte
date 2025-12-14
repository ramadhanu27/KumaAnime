<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import { watchHistory, type WatchHistoryItem } from '$lib/stores/watchHistory';
	import { onMount } from 'svelte';

	let history: WatchHistoryItem[] = [];

	onMount(() => {
		// Subscribe to history changes
		const unsubscribe = watchHistory.subscribe((value) => {
			history = value;
		});

		return unsubscribe;
	});

	function formatDate(isoString: string): string {
		const date = new Date(isoString);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		
		const minutes = Math.floor(diff / (1000 * 60));
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));

		if (minutes < 1) return 'Baru saja';
		if (minutes < 60) return `${minutes} menit yang lalu`;
		if (hours < 24) return `${hours} jam yang lalu`;
		if (days < 7) return `${days} hari yang lalu`;
		
		return date.toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	function removeFromHistory(slug: string) {
		watchHistory.remove(slug);
	}

	function clearAllHistory() {
		if (confirm('Hapus semua riwayat tonton?')) {
			watchHistory.clear();
		}
	}
</script>

<Header />
<Navigation />

<main class="history-page">
	<div class="section-header">
		<div class="header-left">
			<h2>Riwayat Tonton</h2>
			<span class="subtitle">Daftar anime yang pernah kamu tonton</span>
		</div>
		{#if history.length > 0}
			<button class="clear-btn" on:click={clearAllHistory}>
				Hapus Semua
			</button>
		{/if}
	</div>

	{#if history.length === 0}
		<div class="empty-state">
			<h3>Belum Ada Riwayat</h3>
			<p>Anime yang kamu tonton akan muncul di sini</p>
			<a href="/" class="browse-btn">Mulai Menonton</a>
		</div>
	{:else}
		<div class="history-grid">
			{#each history as item (item.slug)}
				<div class="history-card">
					<a href={`/watch?slug=${encodeURIComponent(item.slug)}`} class="card-link">
						<div class="card-thumbnail">
							{#if item.thumbnail}
								<img src={item.thumbnail} alt={item.title} loading="lazy" />
							{:else}
								<div class="no-thumbnail">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
										<polygon points="5 3 19 12 5 21 5 3"/>
									</svg>
								</div>
							{/if}
							<span class="episode-badge">EP {item.episode}</span>
							<div class="play-overlay">
								<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
									<polygon points="5 3 19 12 5 21 5 3"/>
								</svg>
							</div>
						</div>
						<div class="card-info">
							<h3 class="anime-title">{item.seriesName}</h3>
							<p class="episode-title">{item.title}</p>
							<span class="watched-time">{formatDate(item.watchedAt)}</span>
						</div>
					</a>
					<button class="remove-btn" on:click={() => removeFromHistory(item.slug)} title="Hapus dari riwayat">
						✕
					</button>
				</div>
			{/each}
		</div>
	{/if}
</main>

<Footer />

<style>
	.history-page {
		max-width: 1400px;
		margin: 0 auto;
		padding: 120px 24px 40px;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		padding-bottom: 12px;
		border-bottom: 1px solid #27272a;
		flex-wrap: wrap;
		gap: 12px;
	}

	.header-left h2 {
		font-size: 18px;
		font-weight: 600;
		color: #f4f4f5;
		margin: 0 0 4px;
	}

	.subtitle {
		color: #71717a;
		font-size: 13px;
	}

	.clear-btn {
		padding: 8px 16px;
		background: #dc2626;
		border: none;
		border-radius: 6px;
		color: #fff;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.clear-btn:hover {
		background: #ef4444;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: 60px 40px;
		background: #18181b;
		border-radius: 8px;
	}

	.empty-state h3 {
		font-size: 20px;
		font-weight: 600;
		color: #f4f4f5;
		margin: 0 0 8px;
	}

	.empty-state p {
		color: #71717a;
		margin: 0 0 20px;
	}

	.browse-btn {
		display: inline-block;
		padding: 10px 20px;
		background: #facc15;
		border-radius: 6px;
		color: #0f0f0f;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s;
	}

	.browse-btn:hover {
		background: #fde047;
	}

	/* History Grid */
	.history-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 16px;
	}

	.history-card {
		position: relative;
		background: #18181b;
		border-radius: 6px;
		overflow: hidden;
		transition: all 0.2s;
	}

	.history-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0,0,0,0.3);
	}

	.card-link {
		display: flex;
		text-decoration: none;
		color: inherit;
	}

	.card-thumbnail {
		position: relative;
		width: 140px;
		height: 100px;
		flex-shrink: 0;
		overflow: hidden;
		background: #27272a;
	}

	.card-thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s;
	}

	.history-card:hover .card-thumbnail img {
		transform: scale(1.05);
	}

	.no-thumbnail {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #52525b;
	}

	.episode-badge {
		position: absolute;
		top: 6px;
		left: 6px;
		background: #dc2626;
		color: white;
		font-size: 10px;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 2px;
	}

	.play-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.2s;
		color: white;
	}

	.history-card:hover .play-overlay {
		opacity: 1;
	}

	.card-info {
		flex: 1;
		padding: 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}

	.anime-title {
		font-size: 13px;
		font-weight: 600;
		color: #e4e4e7;
		margin: 0 0 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.history-card:hover .anime-title {
		color: #facc15;
	}

	.episode-title {
		font-size: 12px;
		color: #71717a;
		margin: 0 0 6px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.watched-time {
		font-size: 11px;
		color: #52525b;
	}

	.remove-btn {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 24px;
		height: 24px;
		background: rgba(0, 0, 0, 0.6);
		border: none;
		border-radius: 4px;
		color: #a1a1aa;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.2s;
		font-size: 12px;
	}

	.history-card:hover .remove-btn {
		opacity: 1;
	}

	.remove-btn:hover {
		background: #dc2626;
		color: white;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.history-page {
			padding: 72px 16px 80px;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.history-grid {
			grid-template-columns: 1fr;
		}

		.card-thumbnail {
			width: 120px;
			height: 85px;
		}
	}
</style>
