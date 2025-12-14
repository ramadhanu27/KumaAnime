<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let countdown = 10;
	let isReady = false;
	let targetUrl = '';
	let linkTitle = '';
	let isLoading = true;
	let error = '';
	let showButton = false;

	function decodeUrl(encoded: string): string {
		try {
			return atob(encoded);
		} catch {
			return '';
		}
	}

	onMount(() => {
		const encodedUrl = $page.url.searchParams.get('url');
		const title = $page.url.searchParams.get('title');
		
		if (!encodedUrl) {
			error = 'Link tidak valid atau sudah kadaluarsa';
			isLoading = false;
			return;
		}

		targetUrl = decodeUrl(encodedUrl);
		linkTitle = title ? decodeURIComponent(title) : 'Download File';

		if (!targetUrl) {
			error = 'Link tidak valid atau sudah kadaluarsa';
			isLoading = false;
			return;
		}

		isLoading = false;

		// Initialize Google AdSense ads
		try {
			const w = window as any;
			(w.adsbygoogle = w.adsbygoogle || []).push({});
			(w.adsbygoogle = w.adsbygoogle || []).push({});
		} catch (e) {
			console.log('AdSense not loaded:', e);
		}

		// Start countdown
		const timer = setInterval(() => {
			countdown--;
			if (countdown <= 0) {
				clearInterval(timer);
				isReady = true;
				// Delay button animation
				setTimeout(() => {
					showButton = true;
				}, 200);
			}
		}, 1000);

		return () => clearInterval(timer);
	});

	function handleDownload() {
		if (isReady && targetUrl) {
			window.open(targetUrl, '_blank');
		}
	}

	function formatTime(seconds: number): string {
		return seconds.toString().padStart(2, '0');
	}
</script>

<svelte:head>
	<title>Safelink - KumaStream</title>
	<meta name="description" content="Halaman safelink KumaStream. Tunggu beberapa detik untuk mendapatkan link download.">
	<meta name="robots" content="noindex, nofollow">
</svelte:head>

<Header />
<Navigation />

<main class="safelink-page">
	<div class="safelink-container">
		{#if isLoading}
			<div class="loading-state">
				<div class="loader"></div>
				<p>Memproses link...</p>
			</div>
		{:else if error}
			<div class="error-state">
				<div class="error-icon">
					<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
					</svg>
				</div>
				<h2>Link Tidak Valid</h2>
				<p>{error}</p>
				<a href="/" class="back-btn">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					Kembali ke Beranda
				</a>
			</div>
		{:else}
			<!-- Header Section -->
			<div class="safelink-header">
				<div class="logo-icon">
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
						<polyline points="9 12 11 14 15 10"/>
					</svg>
				</div>
				<h1>Safelink Download</h1>
				<p>Tunggu beberapa detik untuk mendapatkan link download</p>
			</div>

			<!-- File Info -->
			<div class="file-info">
				<div class="file-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
						<polyline points="14 2 14 8 20 8"/>
						<line x1="16" y1="13" x2="8" y2="13"/>
						<line x1="16" y1="17" x2="8" y2="17"/>
					</svg>
				</div>
				<div class="file-details">
					<span class="file-label">Nama File</span>
					<span class="file-name">{linkTitle}</span>
				</div>
			</div>

			<!-- Ad Space 1 - Google AdSense -->
			<div class="ad-container">
				<ins class="adsbygoogle"
					style="display:block"
					data-ad-client="ca-pub-3983359568431138"
					data-ad-slot="auto"
					data-ad-format="auto"
					data-full-width-responsive="true"></ins>
			</div>

			<!-- Countdown Section -->
			<div class="countdown-section">
				{#if !isReady}
					<div class="countdown-wrapper">
						<div class="countdown-label">Link akan tersedia dalam</div>
						<div class="countdown-timer">
							<div class="countdown-circle">
								<svg viewBox="0 0 100 100">
									<circle 
										class="bg-circle" 
										cx="50" cy="50" r="45"
									/>
									<circle 
										class="progress-circle" 
										cx="50" cy="50" r="45"
										style="stroke-dashoffset: {283 - (283 * (10 - countdown) / 10)}"
									/>
								</svg>
								<div class="countdown-number">{formatTime(countdown)}</div>
							</div>
						</div>
						<div class="countdown-text">detik</div>
					</div>

					<!-- Progress Steps -->
					<div class="progress-steps">
						<div class="step" class:active={countdown <= 10} class:completed={countdown < 8}>
							<div class="step-icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
								</svg>
							</div>
							<span>Verifikasi Link</span>
						</div>
						<div class="step-connector" class:active={countdown < 8}></div>
						<div class="step" class:active={countdown < 8} class:completed={countdown < 4}>
							<div class="step-icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
								</svg>
							</div>
							<span>Memproses</span>
						</div>
						<div class="step-connector" class:active={countdown < 4}></div>
						<div class="step" class:active={countdown < 4} class:completed={countdown <= 0}>
							<div class="step-icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<polyline points="20 6 9 17 4 12"/>
								</svg>
							</div>
							<span>Siap</span>
						</div>
					</div>
				{:else}
					<div class="ready-state" class:show={showButton}>
						<div class="success-icon">
							<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"/>
								<polyline points="8 12 11 15 16 9"/>
							</svg>
						</div>
						<h2>Link Sudah Siap!</h2>
						<p>Klik tombol di bawah untuk memulai download</p>
						
						<button class="download-btn" on:click={handleDownload}>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
								<polyline points="7 10 12 15 17 10"/>
								<line x1="12" y1="15" x2="12" y2="3"/>
							</svg>
							Download Sekarang
						</button>

						<div class="alternative-link">
							<span>Atau salin link:</span>
							<div class="link-box">
								<input type="text" readonly value={targetUrl} />
								<button on:click={() => navigator.clipboard.writeText(targetUrl)}>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Ad Space 2 - Google AdSense -->
			<div class="ad-container">
				<ins class="adsbygoogle"
					style="display:block"
					data-ad-client="ca-pub-3983359568431138"
					data-ad-slot="auto"
					data-ad-format="auto"
					data-full-width-responsive="true"></ins>
			</div>

			<!-- Instructions -->
			<div class="instructions">
				<h3>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
					</svg>
					Petunjuk Download
				</h3>
				<ul>
					<li>Tunggu countdown selesai hingga tombol download muncul</li>
					<li>Klik tombol <strong>"Download Sekarang"</strong> untuk memulai</li>
					<li>Jika link tidak berfungsi, gunakan tombol salin link</li>
					<li>Matikan AdBlocker untuk mendukung kami</li>
				</ul>
			</div>

			<!-- Back Button -->
			<div class="back-section">
				<a href="javascript:history.back()" class="back-link">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					Kembali ke Halaman Sebelumnya
				</a>
			</div>
		{/if}
	</div>
</main>

<Footer />

<style>
	.safelink-page {
		min-height: 100vh;
		padding: 120px 24px 60px;
		max-width: 800px;
		margin: 0 auto;
	}

	.safelink-container {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	/* Loading State */
	.loading-state {
		text-align: center;
		padding: 80px 40px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.loader {
		width: 50px;
		height: 50px;
		border: 3px solid rgba(99, 102, 241, 0.15);
		border-top-color: #6366f1;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 20px;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.loading-state p {
		color: rgba(248, 250, 252, 0.6);
	}

	/* Error State */
	.error-state {
		text-align: center;
		padding: 60px 40px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.error-icon {
		color: #f43f5e;
		margin-bottom: 20px;
	}

	.error-state h2 {
		color: #f8fafc;
		font-size: 24px;
		margin: 0 0 12px;
	}

	.error-state p {
		color: rgba(248, 250, 252, 0.6);
		margin: 0 0 24px;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		color: white;
		text-decoration: none;
		border-radius: 12px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.back-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
	}

	/* Header */
	.safelink-header {
		text-align: center;
		padding: 40px;
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%);
		border-radius: 24px;
		border: 1px solid rgba(99, 102, 241, 0.2);
	}

	.logo-icon {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 20px;
		color: white;
		box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
	}

	.safelink-header h1 {
		font-size: 28px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 8px;
	}

	.safelink-header p {
		color: rgba(248, 250, 252, 0.6);
		font-size: 15px;
		margin: 0;
	}

	/* File Info */
	.file-info {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 20px 24px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.file-icon {
		width: 56px;
		height: 56px;
		background: rgba(16, 185, 129, 0.15);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #34d399;
		flex-shrink: 0;
	}

	.file-details {
		flex: 1;
		min-width: 0;
	}

	.file-label {
		display: block;
		font-size: 12px;
		color: rgba(248, 250, 252, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 4px;
	}

	.file-name {
		display: block;
		font-size: 16px;
		font-weight: 600;
		color: #f8fafc;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Ad Container */
	.ad-container {
		width: 100%;
		min-height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(26, 26, 46, 0.3);
		border-radius: 12px;
		overflow: hidden;
	}

	.ad-container ins {
		width: 100%;
	}

	/* Countdown Section */
	.countdown-section {
		padding: 40px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.countdown-wrapper {
		text-align: center;
	}

	.countdown-label {
		font-size: 16px;
		color: rgba(248, 250, 252, 0.7);
		margin-bottom: 24px;
	}

	.countdown-timer {
		display: flex;
		justify-content: center;
		margin-bottom: 16px;
	}

	.countdown-circle {
		position: relative;
		width: 150px;
		height: 150px;
	}

	.countdown-circle svg {
		transform: rotate(-90deg);
		width: 100%;
		height: 100%;
	}

	.bg-circle {
		fill: none;
		stroke: rgba(99, 102, 241, 0.15);
		stroke-width: 8;
	}

	.progress-circle {
		fill: none;
		stroke: url(#gradient);
		stroke: #6366f1;
		stroke-width: 8;
		stroke-linecap: round;
		stroke-dasharray: 283;
		transition: stroke-dashoffset 0.5s ease;
	}

	.countdown-number {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 48px;
		font-weight: 800;
		color: #f8fafc;
		font-family: 'Segoe UI', sans-serif;
	}

	.countdown-text {
		font-size: 14px;
		color: rgba(248, 250, 252, 0.5);
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	/* Progress Steps */
	.progress-steps {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0;
		margin-top: 32px;
		padding-top: 32px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.step {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		opacity: 0.4;
		transition: all 0.3s ease;
	}

	.step.active {
		opacity: 1;
	}

	.step.completed .step-icon {
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		color: white;
	}

	.step-icon {
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(248, 250, 252, 0.6);
		transition: all 0.3s ease;
	}

	.step.active .step-icon {
		background: rgba(99, 102, 241, 0.2);
		color: #818cf8;
	}

	.step span {
		font-size: 12px;
		color: rgba(248, 250, 252, 0.7);
		font-weight: 500;
	}

	.step-connector {
		width: 60px;
		height: 2px;
		background: rgba(255, 255, 255, 0.1);
		margin: 0 16px 24px;
		transition: background 0.3s ease;
	}

	.step-connector.active {
		background: linear-gradient(90deg, #10b981, #059669);
	}

	/* Ready State */
	.ready-state {
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.5s ease;
	}

	.ready-state.show {
		opacity: 1;
		transform: translateY(0);
	}

	.success-icon {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 20px;
		color: white;
		animation: successPulse 2s ease infinite;
	}

	@keyframes successPulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
		50% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
	}

	.ready-state h2 {
		font-size: 24px;
		font-weight: 800;
		color: #f8fafc;
		margin: 0 0 8px;
	}

	.ready-state p {
		color: rgba(248, 250, 252, 0.6);
		margin: 0 0 24px;
	}

	.download-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 18px 48px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border: none;
		border-radius: 16px;
		color: white;
		font-size: 18px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		animation: buttonPulse 2s ease infinite;
	}

	@keyframes buttonPulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.02); }
	}

	.download-btn:hover {
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4);
		animation: none;
	}

	.alternative-link {
		margin-top: 24px;
		padding-top: 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.alternative-link span {
		display: block;
		font-size: 13px;
		color: rgba(248, 250, 252, 0.5);
		margin-bottom: 10px;
	}

	.link-box {
		display: flex;
		gap: 8px;
		max-width: 400px;
		margin: 0 auto;
	}

	.link-box input {
		flex: 1;
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: rgba(248, 250, 252, 0.7);
		font-size: 13px;
		min-width: 0;
	}

	.link-box button {
		padding: 12px 16px;
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 10px;
		color: #818cf8;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.link-box button:hover {
		background: #6366f1;
		color: white;
	}

	/* Instructions */
	.instructions {
		padding: 24px;
		background: rgba(26, 26, 46, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.instructions h3 {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 16px;
		font-weight: 700;
		color: #f8fafc;
		margin: 0 0 16px;
	}

	.instructions h3 svg {
		color: #fbbf24;
	}

	.instructions ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.instructions li {
		position: relative;
		padding-left: 24px;
		padding-bottom: 12px;
		color: rgba(248, 250, 252, 0.7);
		font-size: 14px;
		line-height: 1.6;
	}

	.instructions li:last-child {
		padding-bottom: 0;
	}

	.instructions li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 8px;
		width: 8px;
		height: 8px;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-radius: 50%;
	}

	.instructions li strong {
		color: #34d399;
	}

	/* Back Section */
	.back-section {
		text-align: center;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		color: rgba(248, 250, 252, 0.7);
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.back-link:hover {
		background: rgba(99, 102, 241, 0.15);
		border-color: rgba(99, 102, 241, 0.3);
		color: #818cf8;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.safelink-page {
			padding: 100px 16px 100px;
		}

		.safelink-header {
			padding: 30px 20px;
		}

		.safelink-header h1 {
			font-size: 22px;
		}

		.file-info {
			flex-direction: column;
			text-align: center;
		}

		.countdown-section {
			padding: 30px 20px;
		}

		.countdown-circle {
			width: 120px;
			height: 120px;
		}

		.countdown-number {
			font-size: 36px;
		}

		.progress-steps {
			flex-wrap: wrap;
			gap: 16px;
		}

		.step-connector {
			display: none;
		}

		.download-btn {
			width: 100%;
			padding: 16px 32px;
			font-size: 16px;
		}

		.link-box {
			flex-direction: column;
		}

		.instructions {
			padding: 20px;
		}
	}
</style>
