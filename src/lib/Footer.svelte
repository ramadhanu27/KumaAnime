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

<footer>
	<div class="footer-content">
		<div class="brand">
			<span class="logo">Kuma<span class="accent">Stream</span></span>
			<p>Streaming dan download anime subtitle Indonesia gratis. Koleksi lengkap anime ongoing dan completed.</p>
			<div class="socials">
				<a href="#" aria-label="Twitter">
					<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
				</a>
				<a href="#" aria-label="Discord">
					<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
				</a>
				<a href="#" aria-label="Telegram">
					<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
				</a>
			</div>
		</div>

		<div class="links">
			<h4>Quick Links</h4>
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/ongoing">Ongoing</a></li>
				<li><a href="/anime-list">Anime List</a></li>
				<li><a href="/schedule">Schedule</a></li>
			</ul>
		</div>

		<div class="links">
			<h4>Genres</h4>
			<ul>
				<li><a href="/genre?slug=action">Action</a></li>
				<li><a href="/genre?slug=romance">Romance</a></li>
				<li><a href="/genre?slug=comedy">Comedy</a></li>
				<li><a href="/genre?slug=fantasy">Fantasy</a></li>
			</ul>
		</div>

		<div class="links">
			<h4>Information</h4>
			<ul>
				<li><a href="/privacy">Privacy Policy</a></li>
				<li><a href="/terms">Terms of Service</a></li>
				<li><a href="/dmca">DMCA</a></li>
			</ul>
		</div>
	</div>

	<div class="footer-bottom">
		<p>© {currentYear} KumaStream. All Rights Reserved.</p>
		<p class="disclaimer">Disclaimer: This site does not store any files on its server.</p>
	</div>
</footer>

<button 
	class="back-top" 
	class:show={showBackToTop} 
	on:click={scrollToTop}
	aria-label="Back to top"
>
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
		<path d="M12 19V5M5 12l7-7 7 7"/>
	</svg>
</button>

<style>
	footer {
		background: #0a0a0a;
		margin-top: 60px;
		border-top: 1px solid #27272a;
	}

	.footer-content {
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr 1fr;
		gap: 40px;
		max-width: 1400px;
		margin: 0 auto;
		padding: 48px 24px 40px;
	}

	.brand {
		max-width: 300px;
	}

	.logo {
		font-size: 20px;
		font-weight: 700;
		color: #f4f4f5;
	}

	.accent {
		color: #facc15;
	}

	.brand p {
		color: #71717a;
		font-size: 13px;
		line-height: 1.6;
		margin: 12px 0 16px;
	}

	.socials {
		display: flex;
		gap: 8px;
	}

	.socials a {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #71717a;
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 6px;
		transition: all 0.2s;
	}

	.socials a:hover {
		color: #f4f4f5;
		border-color: #3f3f46;
	}

	.links h4 {
		color: #f4f4f5;
		font-size: 13px;
		font-weight: 600;
		margin: 0 0 16px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.links ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.links li {
		margin-bottom: 10px;
	}

	.links a {
		color: #71717a;
		font-size: 13px;
		text-decoration: none;
		transition: color 0.2s;
	}

	.links a:hover {
		color: #f4f4f5;
	}

	.footer-bottom {
		text-align: center;
		padding: 20px 24px;
		border-top: 1px solid #18181b;
	}

	.footer-bottom p {
		color: #52525b;
		font-size: 12px;
		margin: 0;
	}

	.disclaimer {
		margin-top: 6px !important;
		font-size: 11px !important;
	}

	.back-top {
		position: fixed;
		bottom: 80px;
		right: 20px;
		width: 44px;
		height: 44px;
		background: #facc15;
		border: none;
		border-radius: 6px;
		color: #0f0f0f;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		visibility: hidden;
		transform: translateY(10px);
		transition: all 0.2s;
		z-index: 99;
	}

	.back-top.show {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.back-top:hover {
		background: #eab308;
	}

	@media (max-width: 900px) {
		.footer-content {
			grid-template-columns: 1fr 1fr;
			gap: 32px;
		}

		.brand {
			grid-column: 1 / -1;
			max-width: none;
			text-align: center;
		}

		.socials {
			justify-content: center;
		}

		.links {
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.footer-content {
			grid-template-columns: 1fr;
			padding: 32px 16px;
		}
	}
</style>
