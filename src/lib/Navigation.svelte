<script lang="ts">
	import { onMount } from 'svelte';

	let menuOpen = false;
	let mobileMenuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
		const menu = document.getElementById('menu');
		if (menu) {
			menu.classList.toggle('show');
		}
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	onMount(() => {
		const dropdown = document.querySelector('.dropdown');
		if (dropdown) {
			dropdown.addEventListener('click', toggleMenu);
		}

		return () => {
			if (dropdown) {
				dropdown.removeEventListener('click', toggleMenu);
			}
		};
	});
</script>

<!-- Desktop Navigation Menu -->
<div id="menu" class:show={menuOpen}>
	<div class="centernav">
		<div class="dropdown">
			<i class="fa fa-bars"></i>
		</div>
		<ul class="menu">
			<li><a href="/">Home</a></li>
			<li><a href="/anime-list">Anime List</a></li>
			<li><a href="/ongoing">Ongoing</a></li>
			<li><a href="/history">History</a></li>
			<li><a href="/schedule">Schedule</a></li>
		</ul>
	</div>
</div>

<!-- Mobile Bottom Navigation -->
<nav class="mobile-bottom-nav">
	<a href="/" class="nav-item">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
			<polyline points="9 22 9 12 15 12 15 22"></polyline>
		</svg>
		<span>Home</span>
	</a>
	
	<a href="/search" class="nav-item">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="11" cy="11" r="8"></circle>
			<path d="m21 21-4.35-4.35"></path>
		</svg>
		<span>Search</span>
	</a>
	
	<button class="nav-item center-btn" on:click={toggleMobileMenu}>
		<div class="center-icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="3" y1="12" x2="21" y2="12"></line>
				<line x1="3" y1="6" x2="21" y2="6"></line>
				<line x1="3" y1="18" x2="21" y2="18"></line>
			</svg>
		</div>
	</button>
	
	<a href="/history" class="nav-item">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="10"></circle>
			<polyline points="12 6 12 12 16 14"></polyline>
		</svg>
		<span>History</span>
	</a>
	
	<a href="/login" class="nav-item">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
			<polyline points="10 17 15 12 10 7"></polyline>
			<line x1="15" y1="12" x2="3" y2="12"></line>
		</svg>
		<span>Login</span>
	</a>
</nav>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
	<div class="mobile-menu-overlay" on:click={toggleMobileMenu} on:keydown={(e) => e.key === 'Escape' && toggleMobileMenu()} role="button" tabindex="0"></div>
	<div class="mobile-menu-popup">
		<div class="mobile-menu-header">
			<h3>Menu</h3>
			<button class="close-btn" on:click={toggleMobileMenu}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</div>
		<ul class="mobile-menu-list">
			<li>
				<a href="/" on:click={toggleMobileMenu}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
					Home
				</a>
			</li>
			<li>
				<a href="/anime-list" on:click={toggleMobileMenu}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
					Anime List
				</a>
			</li>
			<li>
				<a href="/ongoing" on:click={toggleMobileMenu}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
					Ongoing
				</a>
			</li>
			<li>
				<a href="/complete" on:click={toggleMobileMenu}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
					Complete
				</a>
			</li>
			<li>
				<a href="/schedule" on:click={toggleMobileMenu}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
					Schedule
				</a>
			</li>
			<li>
				<a href="/random" on:click={toggleMobileMenu}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
					Random
				</a>
			</li>
			<li>
				<a href="/history" on:click={toggleMobileMenu}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
					History
				</a>
			</li>
		</ul>
	</div>
{/if}

<style>
	/* Desktop Navigation Menu */
	:global(#menu) {
		width: 100%;
		background: linear-gradient(135deg, #2d2d4a 0%, #3d3d6b 50%, #4a4a7a 100%);
		height: 50px;
		position: fixed;
		top: 70px;
		left: 0;
		z-index: 999;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}

	:global(#menu .centernav) {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 24px;
		display: flex;
		align-items: center;
		height: 100%;
		position: relative;
	}

	:global(#menu .menu) {
		display: flex;
		gap: 4px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	:global(#menu .menu li a) {
		display: flex;
		align-items: center;
		gap: 6px;
		color: rgba(248, 250, 252, 0.7);
		height: 50px;
		padding: 0 16px;
		font-weight: 500;
		font-size: 14px;
		text-decoration: none;
		transition: all 0.3s ease;
		border-radius: 8px;
	}

	:global(#menu .menu li a:hover) {
		color: #f8fafc;
		background: rgba(99, 102, 241, 0.1);
	}

	:global(#menu #btn-randrom) {
		position: absolute;
		right: 24px;
		top: 50%;
		transform: translateY(-50%);
		background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
		color: #fff;
		font-size: 12px;
		font-weight: 600;
		border-radius: 20px;
		padding: 10px 18px;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
	}

	:global(#menu #btn-randrom:hover) {
		transform: translateY(-50%) scale(1.05);
		box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
	}

	:global(#menu .dropdown) {
		display: none;
	}

	/* Mobile Bottom Navigation */
	.mobile-bottom-nav {
		display: none;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #1a1a2e;
		padding: 8px 0;
		padding-bottom: calc(8px + env(safe-area-inset-bottom));
		z-index: 1000;
		justify-content: space-around;
		align-items: flex-end;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
		border-top: 1px solid #2a2a3e;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #888;
		text-decoration: none;
		font-size: 11px;
		gap: 4px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px 8px;
		transition: color 0.2s ease;
		min-width: 60px;
	}

	.nav-item:hover,
	.nav-item:focus {
		color: #fff;
	}

	.nav-item svg {
		width: 22px;
		height: 22px;
	}

	.nav-item span {
		font-size: 10px;
		white-space: nowrap;
	}

	/* Center floating button */
	.center-btn {
		position: relative;
		margin-top: -30px;
	}

	.center-icon {
		background: linear-gradient(135deg, #4ade80, #22c55e);
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 15px rgba(74, 222, 128, 0.4);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.center-btn:hover .center-icon {
		transform: scale(1.1);
		box-shadow: 0 6px 20px rgba(74, 222, 128, 0.5);
	}

	.center-icon svg {
		color: #fff;
		width: 24px;
		height: 24px;
	}

	/* Mobile Menu Overlay */
	.mobile-menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1001;
	}

	.mobile-menu-popup {
		position: fixed;
		bottom: 70px;
		left: 50%;
		transform: translateX(-50%);
		background: #1a1a2e;
		border-radius: 16px;
		width: 90%;
		max-width: 320px;
		z-index: 1002;
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		animation: slideUp 0.3s ease;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	.mobile-menu-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 20px;
		border-bottom: 1px solid #2a2a3e;
	}

	.mobile-menu-header h3 {
		margin: 0;
		color: #fff;
		font-size: 18px;
		font-weight: 600;
	}

	.close-btn {
		background: none;
		border: none;
		color: #888;
		cursor: pointer;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.2s;
	}

	.close-btn:hover {
		color: #fff;
	}

	.mobile-menu-list {
		list-style: none;
		margin: 0;
		padding: 8px 0;
	}

	.mobile-menu-list li a {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 20px;
		color: #ccc;
		text-decoration: none;
		font-size: 15px;
		transition: all 0.2s ease;
	}

	.mobile-menu-list li a svg {
		color: #818cf8;
		flex-shrink: 0;
	}

	.mobile-menu-list li a:hover {
		background: rgba(99, 102, 241, 0.1);
		color: #fff;
	}

	.mobile-menu-list li a:hover svg {
		color: #a5b4fc;
	}

	/* Show mobile nav only on mobile */
	@media screen and (max-width: 800px) {
		.mobile-bottom-nav {
			display: flex;
		}

		/* Hide desktop menu on mobile */
		:global(#menu) {
			display: none;
		}

		/* Add padding to body to prevent content from being hidden behind nav */
		:global(body) {
			padding-bottom: 70px;
		}
	}

	/* Light mode support */
	:global(body:not(.dark)) .mobile-bottom-nav {
		background: #fff;
		border-top-color: #e0e0e0;
	}

	:global(body:not(.dark)) .nav-item {
		color: #666;
	}

	:global(body:not(.dark)) .nav-item:hover {
		color: #333;
	}

	:global(body:not(.dark)) .mobile-menu-popup {
		background: #fff;
	}

	:global(body:not(.dark)) .mobile-menu-header {
		border-bottom-color: #e0e0e0;
	}

	:global(body:not(.dark)) .mobile-menu-header h3 {
		color: #333;
	}

	:global(body:not(.dark)) .mobile-menu-list li a {
		color: #333;
	}

	:global(body:not(.dark)) .mobile-menu-list li a:hover {
		background: #f5f5f5;
	}
</style>
