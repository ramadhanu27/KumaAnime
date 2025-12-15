<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;

	$: scheduleData = data.scheduleData || [];
	$: error = data.error;

	const dayColors: { [key: string]: string } = {
		'Senin': '#3b82f6',
		'Selasa': '#ec4899',
		'Rabu': '#f59e0b',
		'Kamis': '#10b981',
		'Jumat': '#6366f1',
		'Sabtu': '#8b5cf6',
		'Minggu': '#ef4444',
		'Random': '#64748b'
	};

	let selectedDay: string | null = null;

	function selectDay(day: string) {
		selectedDay = selectedDay === day ? null : day;
	}

	function getTodayDay(): string {
		const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
		return days[new Date().getDay()];
	}

	const today = getTodayDay();

	// Auto-select today's schedule on mount
	$: if (scheduleData.length > 0 && selectedDay === null) {
		const todaySchedule = scheduleData.find((s: { day: string }) => s.day === today);
		if (todaySchedule) {
			selectedDay = today;
		} else {
			selectedDay = scheduleData[0]?.day;
		}
	}

	$: currentSchedule = scheduleData.find((s: { day: string }) => s.day === selectedDay);

	function handleImageError(event: Event) {
		const img = event.target as HTMLImageElement;
		img.src = 'https://via.placeholder.com/200x280/18181b/52525b?text=No+Image';
	}
</script>

<Header />
<Navigation />

<main class="schedule-page">
	<div class="section-header">
		<h2>Jadwal Rilis Anime</h2>
		<span class="subtitle">Jadwal tayang anime mingguan</span>
	</div>

	{#if error}
		<div class="error-container">
			<p>{error}</p>
		</div>
	{:else if scheduleData && scheduleData.length > 0}
		<!-- Day Tabs -->
		<div class="day-tabs">
			{#each scheduleData as schedule (schedule.day)}
				<button
					class="day-tab"
					class:active={selectedDay === schedule.day}
					class:today={schedule.day === today}
					style="--day-color: {dayColors[schedule.day] || '#facc15'}"
					on:click={() => selectDay(schedule.day)}
				>
					<span class="day-name">{schedule.day}</span>
					<span class="anime-count">{schedule.anime_list?.length || 0}</span>
					{#if schedule.day === today}
						<span class="today-dot"></span>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Anime Grid -->
		{#if currentSchedule}
			<div class="schedule-content">
				<div class="content-header">
					<h3>{currentSchedule.day}</h3>
					{#if currentSchedule.day === today}
						<span class="today-tag">Hari ini</span>
					{/if}
					<span class="anime-total">{currentSchedule.anime_list?.length || 0} Anime</span>
				</div>

				<div class="anime-grid">
					{#each currentSchedule.anime_list as anime (anime.slug)}
						<a href={`/detail/${encodeURIComponent(anime.slug)}`} class="anime-card">
							<div class="card-image">
								<img src={anime.poster} alt={anime.title} loading="lazy" on:error={handleImageError} />
								<div class="card-overlay">
									<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
										<polygon points="5 3 19 12 5 21 5 3"/>
									</svg>
								</div>
							</div>
							<div class="card-content">
								<h4>{anime.title}</h4>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	{:else}
		<div class="empty-container">
			<h3>Tidak ada jadwal</h3>
			<p>Jadwal anime belum tersedia</p>
		</div>
	{/if}

	<div class="schedule-note">
		<span>⚠️ Jadwal dapat berubah sewaktu-waktu sesuai dengan pihak penyiar</span>
	</div>
</main>

<Footer />

<style>
	.schedule-page {
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
	}

	.section-header h2 {
		font-size: 18px;
		font-weight: 600;
		color: #f4f4f5;
		margin: 0;
	}

	.subtitle {
		color: #71717a;
		font-size: 13px;
	}

	/* Day Tabs */
	.day-tabs {
		display: flex;
		gap: 8px;
		margin-bottom: 24px;
		overflow-x: auto;
		padding-bottom: 8px;
		-webkit-overflow-scrolling: touch;
	}

	.day-tabs::-webkit-scrollbar {
		height: 4px;
	}

	.day-tabs::-webkit-scrollbar-track {
		background: transparent;
	}

	.day-tabs::-webkit-scrollbar-thumb {
		background: #3f3f46;
		border-radius: 4px;
	}

	.day-tab {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 12px 20px;
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 6px;
		color: #a1a1aa;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 80px;
	}

	.day-tab:hover {
		background: #27272a;
		color: #f4f4f5;
	}

	.day-tab.active {
		background: var(--day-color);
		border-color: var(--day-color);
		color: white;
	}

	.day-tab.today:not(.active) {
		border-color: #10b981;
	}

	.day-tab .day-name {
		font-size: 13px;
		font-weight: 600;
	}

	.day-tab .anime-count {
		font-size: 11px;
		padding: 2px 6px;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 10px;
	}

	.today-dot {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 6px;
		height: 6px;
		background: #10b981;
		border-radius: 50%;
	}

	/* Schedule Content */
	.schedule-content {
		background: #18181b;
		border-radius: 8px;
		padding: 20px;
		margin-bottom: 24px;
	}

	.content-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 20px;
		padding-bottom: 12px;
		border-bottom: 1px solid #27272a;
	}

	.content-header h3 {
		font-size: 16px;
		font-weight: 600;
		color: #f4f4f5;
		margin: 0;
	}

	.today-tag {
		font-size: 11px;
		padding: 3px 8px;
		background: #10b981;
		border-radius: 4px;
		color: white;
		font-weight: 600;
	}

	.anime-total {
		margin-left: auto;
		font-size: 13px;
		color: #71717a;
	}

	/* Anime Grid */
	.anime-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 14px;
	}

	.anime-card {
		text-decoration: none;
		background: #27272a;
		border-radius: 6px;
		overflow: hidden;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.anime-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0,0,0,0.4);
	}

	.card-image {
		position: relative;
		width: 100%;
		padding-top: 142%;
		overflow: hidden;
	}

	.card-image img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s;
	}

	.anime-card:hover .card-image img {
		transform: scale(1.05);
	}

	.card-overlay {
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

	.anime-card:hover .card-overlay {
		opacity: 1;
	}

	.card-content {
		padding: 10px;
	}

	.card-content h4 {
		font-size: 12px;
		font-weight: 500;
		color: #e4e4e7;
		margin: 0;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.anime-card:hover .card-content h4 {
		color: #facc15;
	}

	/* Error & Empty States */
	.error-container {
		text-align: center;
		padding: 40px;
		background: #18181b;
		border-radius: 8px;
		color: #dc2626;
		margin-bottom: 24px;
	}

	.error-container p {
		margin: 0;
	}

	.empty-container {
		text-align: center;
		padding: 60px 40px;
		background: #18181b;
		border-radius: 8px;
		margin-bottom: 24px;
	}

	.empty-container h3 {
		color: #f4f4f5;
		font-size: 20px;
		margin: 0 0 8px;
	}

	.empty-container p {
		color: #71717a;
		margin: 0;
	}

	.schedule-note {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 12px 16px;
		background: #27272a;
		border-radius: 6px;
		color: #a1a1aa;
		font-size: 13px;
		text-align: center;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.schedule-page {
			padding: 72px 16px 80px;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}

		.day-tab {
			padding: 10px 14px;
			min-width: 70px;
		}

		.day-tab .day-name {
			font-size: 12px;
		}

		.schedule-content {
			padding: 16px;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
			gap: 10px;
		}

		.card-content {
			padding: 8px;
		}

		.card-content h4 {
			font-size: 11px;
		}
	}
</style>
