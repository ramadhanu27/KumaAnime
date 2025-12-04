<script lang="ts">
	import { onMount } from 'svelte';

	let showBackToTop = false;
	const currentYear = new Date().getFullYear();

	onMount(() => {
		const handleScroll = () => {
			showBackToTop = window.scrollY > 300;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<!-- Footer -->
<footer class="footer">
	<!-- Wave Decoration -->
	<div class="footer-wave">
		<svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z" fill="url(#wave-gradient)"/>
			<defs>
				<linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0">
					<stop offset="0%" stop-color="#6366f1"/>
					<stop offset="50%" stop-color="#8b5cf6"/>
					<stop offset="100%" stop-color="#a855f7"/>
				</linearGradient>
			</defs>
		</svg>
	</div>

	<div class="footer-content">
		<!-- Brand Section -->
		<div class="footer-brand">
			<div class="brand-logo">
				<span class="logo-icon">🎬</span>
				<span class="logo-text">Kuma<span class="accent">Stream</span></span>
			</div>
			<p class="brand-desc">
				Your ultimate destination for watching anime with Indonesian subtitles. 
				Stream or download your favorite anime series for free.
			</p>
			<div class="social-links">
				<a href="#" class="social-link" aria-label="Twitter">
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
				</a>
				<a href="#" class="social-link" aria-label="Discord">
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
				</a>
				<a href="#" class="social-link" aria-label="Telegram">
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
				</a>
			</div>
		</div>

		<!-- Quick Links -->
		<div class="footer-links">
			<h4>Quick Links</h4>
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/ongoing">Ongoing</a></li>
				<li><a href="/anime-list">Anime List</a></li>
				<li><a href="/schedule">Schedule</a></li>
			</ul>
		</div>

		<!-- Genres -->
		<div class="footer-links">
			<h4>Popular Genres</h4>
			<ul>
				<li><a href="/genre/action">Action</a></li>
				<li><a href="/genre/romance">Romance</a></li>
				<li><a href="/genre/comedy">Comedy</a></li>
				<li><a href="/genre/fantasy">Fantasy</a></li>
			</ul>
		</div>

		<!-- Legal -->
		<div class="footer-links">
			<h4>Information</h4>
			<ul>
				<li><a href="/about">About Us</a></li>
				<li><a href="/contact">Contact</a></li>
				<li><a href="/privacy">Privacy Policy</a></li>
				<li><a href="/dmca">DMCA</a></li>
			</ul>
		</div>
	</div>

	<!-- Copyright -->
	<div class="footer-bottom">
		<p>© {currentYear} KumaStream. All Rights Reserved.</p>
		<p class="disclaimer">
			Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
		</p>
	</div>
</footer>

<!-- Back to Top Button -->
<button 
	class="back-to-top" 
	class:show={showBackToTop} 
	on:click={scrollToTop}
	aria-label="Back to top"
>
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<path d="M12 19V5M5 12l7-7 7 7"/>
	</svg>
</button>

<style>
	.footer {
		position: relative;
		background: linear-gradient(180deg, transparent 0%, #0f0f23 5%);
		margin-top: 60px;
	}

	.footer-wave {
		position: absolute;
		top: -60px;
		left: 0;
		right: 0;
		height: 60px;
	}

	.footer-wave svg {
		width: 100%;
		height: 100%;
	}

	.footer-content {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		gap: 40px;
		max-width: 1400px;
		margin: 0 auto;
		padding: 60px 24px 40px;
	}

	/* Brand Section */
	.footer-brand {
		max-width: 350px;
	}

	.brand-logo {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 16px;
	}

	.logo-icon {
		font-size: 32px;
	}

	.logo-text {
		font-size: 24px;
		font-weight: 800;
		color: #f8fafc;
	}

	.accent {
		background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.brand-desc {
		color: rgba(248, 250, 252, 0.6);
		font-size: 14px;
		line-height: 1.7;
		margin-bottom: 20px;
	}

	.social-links {
		display: flex;
		gap: 12px;
	}

	.social-link {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(248, 250, 252, 0.7);
		transition: all 0.3s ease;
	}

	.social-link:hover {
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border-color: transparent;
		color: white;
		transform: translateY(-3px);
	}

	.social-link svg {
		width: 18px;
		height: 18px;
	}

	/* Footer Links */
	.footer-links h4 {
		color: #f8fafc;
		font-size: 15px;
		font-weight: 700;
		margin: 0 0 20px;
		position: relative;
		padding-bottom: 10px;
	}

	.footer-links h4::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 30px;
		height: 2px;
		background: linear-gradient(90deg, #6366f1, #a855f7);
		border-radius: 2px;
	}

	.footer-links ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-links li {
		margin-bottom: 12px;
	}

	.footer-links a {
		color: rgba(248, 250, 252, 0.6);
		font-size: 14px;
		text-decoration: none;
		transition: all 0.3s ease;
		display: inline-block;
	}

	.footer-links a:hover {
		color: #818cf8;
		transform: translateX(5px);
	}

	/* Footer Bottom */
	.footer-bottom {
		text-align: center;
		padding: 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		max-width: 1400px;
		margin: 0 auto;
	}

	.footer-bottom p {
		color: rgba(248, 250, 252, 0.5);
		font-size: 13px;
		margin: 0;
	}

	.disclaimer {
		margin-top: 8px !important;
		font-size: 11px !important;
		opacity: 0.7;
	}

	/* Back to Top Button */
	.back-to-top {
		position: fixed;
		bottom: 100px;
		right: 24px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		opacity: 0;
		visibility: hidden;
		transform: translateY(20px);
		transition: all 0.3s ease;
		z-index: 99;
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
	}

	.back-to-top.show {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.back-to-top:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
	}

	.back-to-top svg {
		width: 22px;
		height: 22px;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.footer-content {
			grid-template-columns: 1fr 1fr;
			gap: 40px 24px;
		}

		.footer-brand {
			max-width: none;
			grid-column: 1 / -1;
			text-align: center;
		}

		.brand-logo {
			justify-content: center;
		}

		.social-links {
			justify-content: center;
		}
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: repeat(2, 1fr);
			padding: 40px 16px 30px;
			gap: 30px 20px;
		}

		.footer-links h4::after {
			left: 50%;
			transform: translateX(-50%);
		}

		.footer-links {
			text-align: center;
		}

		.footer-links a:hover {
			transform: translateX(0);
		}
	}

	@media (max-width: 480px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.back-to-top {
			bottom: 80px;
			right: 16px;
			width: 44px;
			height: 44px;
		}

		.back-to-top svg {
			width: 20px;
			height: 20px;
		}
	}
</style>
