<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	interface AnimeSchedule {
		day: string;
		animes: string[];
	}

	const dayIcons: { [key: string]: string } = {
		'Senin': 'M',
		'Selasa': 'S',
		'Rabu': 'R',
		'Kamis': 'K',
		'Jumat': 'J',
		'Sabtu': 'Sa',
		'Minggu': 'Mi'
	};

	const scheduleData: AnimeSchedule[] = [
		{
			day: 'Senin',
			animes: [
				'City The Animation',
				'Kijin Gentoushou',
				'Kikaijikake no Marie',
				'Mofa Gongzhu de Xiao Fannao',
				'Watashi no Shiawase na Kekkon Season 2'
			]
		},
		{
			day: 'Selasa',
			animes: [
				'Ansatsusha de Aru',
				'Ore no Status ga Yuusha yori mo Akiraka ni Tsuyoi no da ga',
				'Chitose-kun wa Ramune Bin no Naka',
				'Egao no Taenai Shokuba desu.',
				'Fate/strange Fake',
				'Gintama 3-nen Z-gumi Ginpachi-sensei',
				'Grand Blue Season 2',
				'Isekai Quartet Season 3',
				'Ruri no Houseki',
				'Sozai Saishuka no Isekai Ryokouki',
				'Summer Pockets',
				'Toujima Tanzaburou wa Kamen Rider ni Naritai',
				'Rabu Kakkou no Iinazuke Season 2',
				'Kimi to Koete Koi ni Naru',
				'Ninja to Gokudou',
				'Tondemo Skill de Isekai Hourou Meshi Season 2',
				'Yano-kun no Futsuu no Hibi'
			]
		},
		{
			day: 'Rabu',
			animes: [
				'Ameku Takao no Suiri Karte',
				'Bukiyou na Senpai.',
				'Dr. Stone Season 4 Part 2',
				'Jigoku Sensei Nube (2025)',
				'Kakuriyo no Yadomeshi',
				'Ni Kinoko Inu',
				'Let\'s Play: Quest-darake no My Life',
				'Mushoku no Eiyuu',
				'Tensei Akujo no Kuro Rekishi',
				'Tensei shitara Dainana Ouji Datta node Season 2',
				'Touhai: Ura Rate Mahjong Touhai Roku',
				'Wandance'
			]
		},
		{
			day: 'Jumat',
			animes: [
				'Akujiki Reijou to Kyouketsu Koushaku',
				'Around 40 Otoko no Isekai',
				'Tsuuhan',
				'BanG Dream! Ave Mujica',
				'Mecha-ude (TV)',
				'Mizu Zokusei no Mahoutsukai',
				'Mugen Gacha',
				'Senpai wa Otokonoko',
				'Tougen Anki',
				'Towa no Yuugure',
				'Watashi wo Tabetai, Hitodenashi'
			]
		},
		{
			day: 'Sabtu',
			animes: [
				'Astro Note',
				'Boku no Hero Academia Season 8',
				'Guilty Gear Strive: Dual Rulers',
				'Kaijuu 8-gou Season 2',
				'Kao ni Denai Kashiwada-san to Kao ni Deru Oota-kun',
				'Kekkon Yubiwa Monogatari Season 2',
				'Mikata ga Yowasugite Hojo Mahou ni Tesshiteita',
				'Kyuutei Mahoushi',
				'Momentary Lily',
				'Saigo ni Hitotsu dake Onegai shitemo Yoroshii deshou ka'
			]
		},
		{
			day: 'Minggu',
			animes: [
				'Alma-chan wa Kazoku ni Naritai',
				'Anne Shirley',
				'Ao no Orchestra Season 2',
				'Chanto Suenai Kyuuketsuki-chan',
				'Chichi wa Eiyuu, Haha wa Seirei, Musume no Watashi wa Tenseisha.',
				'Digimon Beatbreak',
				'Fumetsu no Anata e Season 3',
				'Gachiakuta',
				'Game Center Shoujo to Ibunka Kouryuu',
				'Gnosia',
				'Hikaru ga Shinda Natsu',
				'Isekai Mokushiroku Mynoghra',
				'Kaoru Hana wa Rin to Saku',
				'Kingdom Season 6',
				'Nageki no Bourei wa Intai shitai Season 2',
				'Nanatsu no Taizai: Mokushiroku no Yonkishi S2',
				'Okinawa de Suki ni Natta Ko ga Hougen Sugite Tsurasugiru',
				'One Piece',
				'One Punch Man Season 3',
				'Seishun Buta Yarou wa Santa Claus no Yume wo Minai',
				'Shuumatsu Touring',
				'SI-VIS: The Sound of Heroes',
				'Taiyou yori mo Mabushii Hoshi',
				'Tomodachi no Imouto ga Ore ni dake Uzai',
				'Uma Musume: Cinderella Gray Part 2',
				'Witch Watch',
				'Yasei no Last Boss ga Arawareta!'
			]
		}
	];

	let expandedDay: string | null = null;

	function toggleDay(day: string) {
		expandedDay = expandedDay === day ? null : day;
	}

	function getTodayDay(): string {
		const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
		return days[new Date().getDay()];
	}

	const today = getTodayDay();
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
		<div class="today-badge">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
				<circle cx="12" cy="12" r="10"/>
			</svg>
			Hari ini: {today}
		</div>
	</div>

	<div class="schedule-grid">
		{#each scheduleData as schedule (schedule.day)}
			<div class="schedule-card" class:today={schedule.day === today} class:expanded={expandedDay === schedule.day}>
				<button
					class="day-header"
					class:expanded={expandedDay === schedule.day}
					on:click={() => toggleDay(schedule.day)}
					aria-expanded={expandedDay === schedule.day}
				>
					<div class="day-info">
						<div class="day-icon" class:today={schedule.day === today}>
							{dayIcons[schedule.day] || schedule.day.charAt(0)}
						</div>
						<div class="day-text">
							<span class="day-name">{schedule.day}</span>
							{#if schedule.day === today}
								<span class="today-label">Hari ini</span>
							{/if}
						</div>
					</div>
					<div class="day-meta">
						<span class="anime-count">{schedule.animes.length}</span>
						<svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</div>
				</button>

				{#if expandedDay === schedule.day}
					<div class="anime-list">
						{#each schedule.animes as anime, index (anime)}
							<div class="anime-item" style="--delay: {index * 0.03}s">
								<div class="anime-number">{index + 1}</div>
								<span class="anime-title">{anime}</span>
								<svg class="anime-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<polygon points="5 3 19 12 5 21 5 3"/>
								</svg>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>

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
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
		text-align: center;
		margin-bottom: 48px;
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
		margin: 0 0 20px;
	}

	.today-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-radius: 25px;
		color: white;
		font-size: 14px;
		font-weight: 600;
	}

	.schedule-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 20px;
		margin-bottom: 40px;
	}

	.schedule-card {
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.3s ease;
	}

	.schedule-card:hover {
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}

	.schedule-card.today {
		border-color: rgba(16, 185, 129, 0.4);
		box-shadow: 0 0 30px rgba(16, 185, 129, 0.15);
	}

	.schedule-card.expanded {
		border-color: rgba(99, 102, 241, 0.4);
	}

	.day-header {
		width: 100%;
		padding: 20px;
		background: transparent;
		border: none;
		color: #f8fafc;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		transition: all 0.3s ease;
	}

	.day-header:hover {
		background: rgba(255, 255, 255, 0.03);
	}

	.day-info {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.day-icon {
		width: 48px;
		height: 48px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		font-weight: 800;
		color: white;
	}

	.day-icon.today {
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
		50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
	}

	.day-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
	}

	.day-name {
		font-size: 18px;
		font-weight: 700;
	}

	.today-label {
		font-size: 11px;
		padding: 3px 8px;
		background: rgba(16, 185, 129, 0.2);
		color: #34d399;
		border-radius: 10px;
		font-weight: 600;
	}

	.day-meta {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.anime-count {
		padding: 6px 14px;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 20px;
		color: #818cf8;
		font-size: 13px;
		font-weight: 700;
	}

	.chevron {
		color: rgba(248, 250, 252, 0.5);
		transition: transform 0.3s ease;
	}

	.day-header.expanded .chevron {
		transform: rotate(180deg);
	}

	.anime-list {
		padding: 0 20px 20px;
		max-height: 400px;
		overflow-y: auto;
	}

	.anime-list::-webkit-scrollbar {
		width: 6px;
	}

	.anime-list::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}

	.anime-list::-webkit-scrollbar-thumb {
		background: rgba(99, 102, 241, 0.4);
		border-radius: 10px;
	}

	.anime-item {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 16px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 10px;
		margin-bottom: 8px;
		transition: all 0.3s ease;
		animation: slideIn 0.3s ease forwards;
		animation-delay: var(--delay);
		opacity: 0;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(-10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.anime-item:hover {
		background: rgba(99, 102, 241, 0.1);
		transform: translateX(4px);
	}

	.anime-item:last-child {
		margin-bottom: 0;
	}

	.anime-number {
		width: 28px;
		height: 28px;
		background: rgba(99, 102, 241, 0.2);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #818cf8;
		font-size: 12px;
		font-weight: 700;
		flex-shrink: 0;
	}

	.anime-title {
		flex: 1;
		color: rgba(248, 250, 252, 0.9);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.4;
	}

	.anime-icon {
		color: rgba(248, 250, 252, 0.3);
		flex-shrink: 0;
		transition: all 0.3s ease;
	}

	.anime-item:hover .anime-icon {
		color: #6366f1;
		transform: scale(1.2);
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
	}

	@media (max-width: 768px) {
		.schedule-page {
			padding: 80px 16px 100px;
		}

		.page-header h1 {
			font-size: 28px;
		}

		.schedule-grid {
			grid-template-columns: 1fr;
		}

		.day-header {
			padding: 16px;
		}

		.day-icon {
			width: 40px;
			height: 40px;
			font-size: 16px;
		}

		.day-name {
			font-size: 16px;
		}

		.anime-list {
			max-height: 300px;
		}
	}
</style>
