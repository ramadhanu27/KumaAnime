<script lang="ts">
	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<!-- Desktop Navigation Menu -->
<nav class="nav-desktop">
	<div class="nav-inner">
		<ul class="nav-links">
			<li><a href="/">Home</a></li>
			<li><a href="/anime-list">Anime List</a></li>
			<li><a href="/ongoing">Ongoing</a></li>
			<li><a href="/complete">Complete</a></li>
			<li><a href="/history">History</a></li>
			<li><a href="/schedule">Schedule</a></li>
		</ul>
	</div>
</nav>

<!-- Mobile Bottom Navigation -->
<nav class="nav-mobile">
	<a href="/" class="nav-item">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
			<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
			<polyline points="9 22 9 12 15 12 15 22"/>
		</svg>
		<span>Home</span>
	</a>
	
	<a href="/search" class="nav-item">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
			<circle cx="11" cy="11" r="8"/>
			<path d="m21 21-4.35-4.35"/>
		</svg>
		<span>Search</span>
	</a>
	
	<button class="nav-item menu-btn" on:click={toggleMobileMenu}>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
			<line x1="3" y1="12" x2="21" y2="12"/>
			<line x1="3" y1="6" x2="21" y2="6"/>
			<line x1="3" y1="18" x2="21" y2="18"/>
		</svg>
		<span>Menu</span>
	</button>
	
	<a href="/history" class="nav-item">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
			<circle cx="12" cy="12" r="10"/>
			<polyline points="12 6 12 12 16 14"/>
		</svg>
		<span>History</span>
	</a>
	
	<a href="/schedule" class="nav-item">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
			<rect x="3" y="4" width="18" height="18" rx="2"/>
			<line x1="16" y1="2" x2="16" y2="6"/>
			<line x1="8" y1="2" x2="8" y2="6"/>
			<line x1="3" y1="10" x2="21" y2="10"/>
		</svg>
		<span>Schedule</span>
	</a>
</nav>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
	<div class="overlay" on:click={toggleMobileMenu} on:keydown={(e) => e.key === 'Escape' && toggleMobileMenu()} role="button" tabindex="0"></div>
	<div class="mobile-menu">
		<div class="mobile-menu-header">
			<span>Menu</span>
			<button on:click={toggleMobileMenu}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
					<line x1="18" y1="6" x2="6" y2="18"/>
					<line x1="6" y1="6" x2="18" y2="18"/>
				</svg>
			</button>
		</div>
		<ul>
			<li><a href="/" on:click={toggleMobileMenu}>Home</a></li>
			<li><a href="/anime-list" on:click={toggleMobileMenu}>Anime List</a></li>
			<li><a href="/ongoing" on:click={toggleMobileMenu}>Ongoing</a></li>
			<li><a href="/complete" on:click={toggleMobileMenu}>Complete</a></li>
			<li><a href="/schedule" on:click={toggleMobileMenu}>Schedule</a></li>
			<li><a href="/history" on:click={toggleMobileMenu}>History</a></li>
		</ul>
	</div>
{/if}

<style>
	/* Desktop Navigation */
	.nav-desktop {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		height: 44px;
		background: #18181b;
		border-bottom: 1px solid #27272a;
		z-index: 999;
	}

	.nav-inner {
		max-width: 1400px;
		height: 100%;
		margin: 0 auto;
		padding: 0 24px;
		display: flex;
		align-items: center;
	}

	.nav-links {
		display: flex;
		gap: 4px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-links li a {
		display: block;
		padding: 10px 16px;
		color: #a1a1aa;
		text-decoration: none;
		font-size: 13px;
		font-weight: 500;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.nav-links li a:hover {
		color: #f4f4f5;
		background: #27272a;
	}

	/* Mobile Bottom Navigation */
	.nav-mobile {
		display: none;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 60px;
		background: #18181b;
		border-top: 1px solid #27272a;
		z-index: 1000;
		justify-content: space-around;
		align-items: center;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		color: #71717a;
		text-decoration: none;
		font-size: 10px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
		transition: color 0.2s;
	}

	.nav-item:hover,
	.nav-item:focus {
		color: #f4f4f5;
	}

	.menu-btn {
		color: #facc15;
	}

	/* Mobile Menu */
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 1001;
	}

	.mobile-menu {
		position: fixed;
		bottom: 70px;
		left: 16px;
		right: 16px;
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 8px;
		z-index: 1002;
		overflow: hidden;
		animation: slideUp 0.2s ease;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.mobile-menu-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		border-bottom: 1px solid #27272a;
	}

	.mobile-menu-header span {
		font-size: 14px;
		font-weight: 600;
		color: #f4f4f5;
	}

	.mobile-menu-header button {
		background: none;
		border: none;
		color: #71717a;
		cursor: pointer;
		padding: 4px;
		display: flex;
	}

	.mobile-menu-header button:hover {
		color: #f4f4f5;
	}

	.mobile-menu ul {
		list-style: none;
		margin: 0;
		padding: 8px 0;
	}

	.mobile-menu ul li a {
		display: block;
		padding: 12px 16px;
		color: #a1a1aa;
		text-decoration: none;
		font-size: 14px;
		transition: all 0.2s;
	}

	.mobile-menu ul li a:hover {
		background: #27272a;
		color: #f4f4f5;
	}

	/* Responsive */
	@media (max-width: 800px) {
		.nav-desktop {
			display: none;
		}

		.nav-mobile {
			display: flex;
		}

		:global(body) {
			padding-bottom: 60px;
		}
	}
</style>
