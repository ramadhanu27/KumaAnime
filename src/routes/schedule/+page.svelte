<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';

	interface AnimeSchedule {
		day: string;
		animes: string[];
	}

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
			day: 'Sunda',
			animes: [
				'Shabake Shin Samurai-den Yaiba',
				'Silent Witch',
				'Spy x Family Season 3',
				'Watari-kun no xx ga Houkai Sunzen'
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
		},
		
	];

	let expandedDay: string | null = null;

	function toggleDay(day: string) {
		expandedDay = expandedDay === day ? null : day;
	}
</script>

<Header />
<Navigation />

<div class="schedule-container">
	<div class="schedule-header">
		<h1>Jadwal Rilis Anime</h1>
		<p class="note">Note: Jadwal bisa berubah sewaktu-waktu</p>
	</div>

	<div class="schedule-grid">
		{#each scheduleData as schedule (schedule.day)}
			<div class="schedule-card">
				<button
					class="day-button"
					class:expanded={expandedDay === schedule.day}
					on:click={() => toggleDay(schedule.day)}
					aria-expanded={expandedDay === schedule.day}
					aria-label="Toggle {schedule.day} schedule"
				>
					<span class="day-name">{schedule.day}</span>
					<span class="anime-count">{schedule.animes.length} anime</span>
					<i class="fa fa-chevron-down"></i>
				</button>

				{#if expandedDay === schedule.day}
					<div class="anime-list">
						{#each schedule.animes as anime (anime)}
							<div class="anime-item">
								<i class="fa fa-play-circle"></i>
								<span>{anime}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<Footer />

<style>
	.schedule-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 50px 20px;
		background: #f5f5f5;
		min-height: calc(100vh - 200px);
	}

	.schedule-header {
		text-align: center;
		margin-bottom: 50px;
		padding: 30px 20px;
		background: #fff;
		border-radius: 12px;
		border: 1px solid #e0e0e0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.schedule-header h1 {
		font-size: 42px;
		font-weight: 700;
		margin: 0 0 15px 0;
		color: #0c70de;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.note {
		color: #ffc107;
		font-size: 15px;
		margin: 0;
		font-style: italic;
		font-weight: 500;
	}

	.schedule-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 24px;
	}

	.schedule-card {
		background: #fff;
		border: 1px solid #e0e0e0;
		border-radius: 12px;
		overflow: hidden;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.schedule-card:hover {
		background: #fff;
		border-color: #0c70de;
		box-shadow: 0 8px 16px rgba(12, 112, 222, 0.15);
		transform: translateY(-4px);
	}

	.day-button {
		width: 100%;
		padding: 18px 16px;
		background: #0c70de;
		border: none;
		color: #fff;
		font-size: 17px;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		transition: all 0.3s ease;
	}

	.day-button:hover {
		background: #1a7eef;
		box-shadow: 0 4px 12px rgba(12, 112, 222, 0.3);
	}

	.day-button.expanded {
		background: #0c70de;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.day-name {
		flex: 1;
		text-align: left;
	}

	.anime-count {
		font-size: 12px;
		color: #ffc107;
		margin-right: 12px;
		background: rgba(255, 193, 7, 0.2);
		padding: 4px 8px;
		border-radius: 4px;
	}

	.day-button i {
		transition: transform 0.3s ease;
	}

	.day-button.expanded i {
		transform: rotate(180deg);
	}

	.anime-list {
		padding: 16px;
		background: #f9f9f9;
		max-height: 500px;
		overflow-y: auto;
	}

	.anime-list::-webkit-scrollbar {
		width: 6px;
	}

	.anime-list::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 10px;
	}

	.anime-list::-webkit-scrollbar-thumb {
		background: rgba(12, 112, 222, 0.5);
		border-radius: 10px;
	}

	.anime-list::-webkit-scrollbar-thumb:hover {
		background: rgba(12, 112, 222, 0.7);
	}

	.anime-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 8px;
		border-bottom: 1px solid #e8e8e8;
		color: #555;
		font-size: 14px;
		transition: all 0.2s ease;
	}

	.anime-item:hover {
		background: #f0f5ff;
		padding-left: 12px;
		color: #0c70de;
	}

	.anime-item:last-child {
		border-bottom: none;
	}

	.anime-item i {
		color: #ffc107;
		font-size: 12px;
		min-width: 12px;
	}

	@media (max-width: 768px) {
		.schedule-container {
			padding: 20px 15px;
		}

		.schedule-header h1 {
			font-size: 28px;
		}

		.schedule-grid {
			grid-template-columns: 1fr;
		}

		.day-button {
			padding: 14px;
			font-size: 15px;
		}

		.anime-list {
			max-height: 400px;
		}
	}
</style>
