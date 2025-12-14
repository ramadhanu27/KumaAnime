<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;

	$: scheduleData = data.scheduleData || [];
	$: error = data.error;

	const dayIcons: { [key: string]: string } = {
		'Senin': 'M',
		'Selasa': 'S',
		'Rabu': 'R',
		'Kamis': 'K',
		'Jumat': 'J',
		'Sabtu': 'Sa',
		'Minggu': 'Mi',
		'Random': '?'
	};

	const dayColors: { [key: string]: string } = {
		'Senin': '#6366f1',
		'Selasa': '#ec4899',
		'Rabu': '#f59e0b',
		'Kamis': '#10b981',
		'Jumat': '#3b82f6',
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
		img.src = 'https://via.placeholder.com/200x280?text=No+Image';
	}
</script>

<Header />
<Navigation />

<main class="schedule-page">
	<div class="page-header">
		<div class="header-icon">
			<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
			</svg>
		</div>
		<h1>Jadwal Rilis Anime</h1>
		<p class="subtitle">Jadwal tayang anime mingguan</p>
	</div>

	{#if error}
		<div class="error-container">
			<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
			</svg>
			<p>{error}</p>
		</div>
	{:else if scheduleData && scheduleData.length > 0}
		<!-- Day Tabs -->
		<div class="day-tabs-container">
			<div class="day-tabs">
				{#each scheduleData as schedule (schedule.day)}
					<button
						class="day-tab"
						class:active={selectedDay === schedule.day}
						class:today={schedule.day === today}
						style="--day-color: {dayColors[schedule.day] || '#6366f1'}"
						on:click={() => selectDay(schedule.day)}
					>
						<span class="day-icon">{dayIcons[schedule.day] || schedule.day.charAt(0)}</span>
						<span class="day-name">{schedule.day}</span>
						<span class="anime-count">{schedule.anime_list?.length || 0}</span>
						{#if schedule.day === today}
							<span class="today-indicator"></span>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		<!-- Anime Grid -->
		{#if currentSchedule}
			<div class="schedule-content">
				<div class="content-header">
					<h2 style="--day-color: {dayColors[currentSchedule.day] || '#6366f1'}">
						<span class="day-badge">{dayIcons[currentSchedule.day] || currentSchedule.day.charAt(0)}</span>
						{currentSchedule.day}
						{#if currentSchedule.day === today}
							<span class="today-tag">Hari ini</span>
						{/if}
					</h2>
					<p class="anime-total">{currentSchedule.anime_list?.length || 0} Anime</p>
				</div>

				<div class="anime-grid">
					{#each currentSchedule.anime_list as anime, index (anime.slug)}
						<a href={`/detail?slug=${encodeURIComponent(anime.slug)}`} class="anime-card" style="--delay: {index * 0.05}s">
							<div class="card-poster">
								<img src={anime.poster} alt={anime.title} loading="lazy" on:error={handleImageError} />
								<div class="card-overlay">
									<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
										<polygon points="5 3 19 12 5 21 5 3"/>
									</svg>
								</div>
							</div>
							<div class="card-info">
								<h3 class="card-title">{anime.title}</h3>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	{:else}
		<div class="empty-container">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
			</svg>
			<h3>Tidak ada jadwal</h3>
			<p>Jadwal anime belum tersedia</p>
		</div>
	{/if}

	<div class="schedule-note">
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
		</svg>
		<span>Jadwal dapat berubah sewaktu-waktu sesuai dengan pihak penyiar</span>
	</div>
</main>

<Footer />

<style>
	.schedule-page {
		min-height: 100vh;
		padding: 130px 24px 60px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		text-align: center;
		margin-bottom: 40px;
	}

	.header-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
		border-radius: 16px;
		color: white;
		margin-bottom: 20px;
	}

	.page-header h1 {
		font-size: 36px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 8px;
	}

	.subtitle {
		color: rgba(248, 250, 252, 0.6);
		font-size: 16px;
		margin: 0;
	}

	/* Day Tabs */
	.day-tabs-container {
		margin-bottom: 32px;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	}

	.day-tabs-container::-webkit-scrollbar {
		display: none;
	}

	.day-tabs {
		display: flex;
		gap: 10px;
		padding: 4px;
		min-width: max-content;
	}

	.day-tab {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 16px 20px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 16px;
		color: rgba(248, 250, 252, 0.7);
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 90px;
	}

	.day-tab:hover {
		border-color: rgba(255, 255, 255, 0.1);
		background: rgba(26, 26, 46, 0.95);
		transform: translateY(-2px);
	}

	.day-tab.active {
		background: linear-gradient(135deg, var(--day-color) 0%, color-mix(in srgb, var(--day-color) 80%, black) 100%);
		border-color: transparent;
		color: white;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		transform: translateY(-4px);
	}

	.day-tab.today:not(.active) {
		border-color: rgba(16, 185, 129, 0.4);
	}

	.day-tab .day-icon {
		font-size: 20px;
		font-weight: 800;
	}

	.day-tab .day-name {
		font-size: 13px;
		font-weight: 600;
	}

	.day-tab .anime-count {
		font-size: 11px;
		padding: 3px 8px;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 10px;
		font-weight: 700;
	}

	.day-tab.active .anime-count {
		background: rgba(255, 255, 255, 0.25);
	}

	.today-indicator {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 8px;
		height: 8px;
		background: #10b981;
		border-radius: 50%;
		animation: blink 1.5s infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	/* Schedule Content */
	.schedule-content {
		background: rgba(26, 26, 46, 0.6);
		backdrop-filter: blur(10px);
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		padding: 32px;
		margin-bottom: 32px;
	}

	.content-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 28px;
		flex-wrap: wrap;
		gap: 16px;
	}

	.content-header h2 {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 28px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0;
	}

	.day-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: linear-gradient(135deg, var(--day-color) 0%, color-mix(in srgb, var(--day-color) 80%, black) 100%);
		border-radius: 14px;
		font-size: 20px;
		font-weight: 800;
		color: white;
	}

	.today-tag {
		font-size: 12px;
		padding: 6px 12px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-radius: 20px;
		font-weight: 600;
		color: white;
	}

	.anime-total {
		font-size: 16px;
		color: rgba(248, 250, 252, 0.6);
		margin: 0;
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 20px;
	}

	/* Anime Grid */
	.anime-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 20px;
	}

	.anime-card {
		text-decoration: none;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.3s ease;
		animation: fadeIn 0.4s ease forwards;
		animation-delay: var(--delay);
		opacity: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.anime-card:hover {
		border-color: rgba(99, 102, 241, 0.4);
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.card-poster {
		position: relative;
		aspect-ratio: 3/4;
		overflow: hidden;
	}

	.card-poster img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.anime-card:hover .card-poster img {
		transform: scale(1.1);
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 50%);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.3s ease;
	}

	.anime-card:hover .card-overlay {
		opacity: 1;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(99, 102, 241, 0.3) 100%);
	}

	.card-overlay svg {
		color: white;
		filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
		transform: scale(0.8);
		transition: transform 0.3s ease;
	}

	.anime-card:hover .card-overlay svg {
		transform: scale(1);
	}

	.card-info {
		padding: 14px;
	}

	.card-title {
		font-size: 13px;
		font-weight: 600;
		color: #f8fafc;
		margin: 0;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Error & Empty States */
	.error-container {
		text-align: center;
		padding: 60px 40px;
		background: rgba(244, 63, 94, 0.1);
		border: 1px solid rgba(244, 63, 94, 0.2);
		border-radius: 20px;
		color: #f43f5e;
		margin-bottom: 40px;
	}

	.error-container svg {
		margin-bottom: 16px;
	}

	.error-container p {
		margin: 0;
		font-size: 16px;
	}

	.empty-container {
		text-align: center;
		padding: 80px 40px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		margin-bottom: 40px;
	}

	.empty-container svg {
		color: rgba(248, 250, 252, 0.3);
		margin-bottom: 24px;
	}

	.empty-container h3 {
		color: #f8fafc;
		font-size: 24px;
		margin: 0 0 8px;
	}

	.empty-container p {
		color: rgba(248, 250, 252, 0.6);
		margin: 0;
	}

	.schedule-note {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 16px 24px;
		background: rgba(251, 191, 36, 0.1);
		border: 1px solid rgba(251, 191, 36, 0.2);
		border-radius: 12px;
		color: #fbbf24;
		font-size: 14px;
		text-align: center;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.schedule-page {
			padding: 80px 16px 100px;
		}

		.page-header h1 {
			font-size: 28px;
		}

		.day-tab {
			padding: 12px 16px;
			min-width: 75px;
		}

		.day-tab .day-icon {
			font-size: 18px;
		}

		.day-tab .day-name {
			font-size: 12px;
		}

		.schedule-content {
			padding: 20px;
			border-radius: 20px;
		}

		.content-header h2 {
			font-size: 22px;
		}

		.day-badge {
			width: 40px;
			height: 40px;
			font-size: 16px;
		}

		.anime-grid {
			grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
			gap: 14px;
		}

		.card-info {
			padding: 10px;
		}

		.card-title {
			font-size: 12px;
		}

		.schedule-note {
			flex-direction: column;
			gap: 8px;
		}
	}
</style>
