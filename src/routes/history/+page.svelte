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
	<div class="page-header">
		<div class="header-icon">
			<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
			</svg>
		</div>
		<div class="header-content">
			<h1>Riwayat Tonton</h1>
			<p>Daftar anime yang pernah kamu tonton</p>
		</div>
		{#if history.length > 0}
			<button class="clear-btn" on:click={clearAllHistory}>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
				</svg>
				Hapus Semua
			</button>
		{/if}
	</div>

	{#if history.length === 0}
		<div class="empty-state">
			<div class="empty-icon">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
				</svg>
			</div>
			<h2>Belum Ada Riwayat</h2>
			<p>Anime yang kamu tonton akan muncul di sini</p>
			<a href="/" class="browse-btn">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polygon points="5 3 19 12 5 21 5 3"/>
				</svg>
				Mulai Menonton
			</a>
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
									<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polygon points="5 3 19 12 5 21 5 3"/>
									</svg>
								</div>
							{/if}
							<div class="episode-badge">EP {item.episode}</div>
							<div class="play-overlay">
								<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
									<polygon points="5 3 19 12 5 21 5 3"/>
								</svg>
							</div>
						</div>
						<div class="card-info">
							<h3 class="anime-title">{item.seriesName}</h3>
							<p class="episode-title">{item.title}</p>
							<div class="watched-time">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
								</svg>
								{formatDate(item.watchedAt)}
							</div>
						</div>
					</a>
					<button class="remove-btn" on:click={() => removeFromHistory(item.slug)} title="Hapus dari riwayat">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
						</svg>
					</button>
				</div>
			{/each}
		</div>
	{/if}
</main>

<Footer />

<style>
	.history-page {
		min-height: 100vh;
		padding: 130px 24px 60px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-bottom: 40px;
		flex-wrap: wrap;
	}

	.header-icon {
		width: 64px;
		height: 64px;
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%);
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #818cf8;
	}

	.header-content {
		flex: 1;
	}

	.header-content h1 {
		font-size: 28px;
		font-weight: 700;
		color: #f8fafc;
		margin: 0 0 4px 0;
	}

	.header-content p {
		color: rgba(248, 250, 252, 0.6);
		margin: 0;
		font-size: 14px;
	}

	.clear-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		background: rgba(244, 63, 94, 0.15);
		border: 1px solid rgba(244, 63, 94, 0.3);
		border-radius: 10px;
		color: #f43f5e;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.clear-btn:hover {
		background: #f43f5e;
		color: white;
		border-color: transparent;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: 80px 40px;
		background: rgba(26, 26, 46, 0.6);
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.empty-icon {
		color: rgba(248, 250, 252, 0.3);
		margin-bottom: 24px;
	}

	.empty-state h2 {
		font-size: 24px;
		font-weight: 700;
		color: #f8fafc;
		margin: 0 0 12px 0;
	}

	.empty-state p {
		color: rgba(248, 250, 252, 0.5);
		margin: 0 0 24px 0;
	}

	.browse-btn {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 14px 28px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 12px;
		color: white;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.browse-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
	}

	/* History Grid */
	.history-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 20px;
	}

	.history-card {
		position: relative;
		background: rgba(26, 26, 46, 0.8);
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.history-card:hover {
		transform: translateY(-4px);
		border-color: rgba(99, 102, 241, 0.3);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
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
	}

	.card-thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.history-card:hover .card-thumbnail img {
		transform: scale(1.1);
	}

	.no-thumbnail {
		width: 100%;
		height: 100%;
		background: rgba(99, 102, 241, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(248, 250, 252, 0.3);
	}

	.episode-badge {
		position: absolute;
		top: 8px;
		left: 8px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		color: white;
		font-size: 10px;
		font-weight: 700;
		padding: 4px 8px;
		border-radius: 6px;
	}

	.play-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
		color: white;
	}

	.history-card:hover .play-overlay {
		opacity: 1;
	}

	.card-info {
		flex: 1;
		padding: 14px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}

	.anime-title {
		font-size: 14px;
		font-weight: 700;
		color: #f8fafc;
		margin: 0 0 4px 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.episode-title {
		font-size: 12px;
		color: rgba(248, 250, 252, 0.7);
		margin: 0 0 8px 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.watched-time {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11px;
		color: rgba(248, 250, 252, 0.5);
	}

	.remove-btn {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 32px;
		height: 32px;
		background: rgba(0, 0, 0, 0.6);
		border: none;
		border-radius: 8px;
		color: rgba(248, 250, 252, 0.7);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.3s ease;
	}

	.history-card:hover .remove-btn {
		opacity: 1;
	}

	.remove-btn:hover {
		background: #f43f5e;
		color: white;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.history-page {
			padding: 130px 16px 80px;
		}

		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.header-icon {
			width: 56px;
			height: 56px;
		}

		.header-content h1 {
			font-size: 24px;
		}

		.history-grid {
			grid-template-columns: 1fr;
		}

		.card-thumbnail {
			width: 120px;
			height: 90px;
		}
	}
</style>
