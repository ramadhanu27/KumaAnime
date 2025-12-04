<script lang="ts">
	import { onMount } from 'svelte';
	import { darkMode } from './stores/darkMode';

	let isScrolled = false;

	onMount(() => {
		// Initialize dark mode from store
		darkMode.init();

		// Handle scroll effect
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function toggleDarkMode() {
		darkMode.toggle();
	}

	function handleSearch(e: Event) {
		e.preventDefault();
		const query = (document.getElementById('q') as HTMLInputElement)?.value;
		if (query) {
			window.location.href = `/search?q=${encodeURIComponent(query)}`;
		}
	}
</script>

<!-- Header -->
<header class="header" class:scrolled={isScrolled}>
	<div class="header-container">
		<!-- Logo -->
		<a href="/" class="logo">
			<span class="logo-icon"><img src="" alt=""></span>
			<span class="logo-text">Kuma<span class="logo-accent">Stream</span></span>
		</a>

		<!-- Search Box -->
		<div class="search-box">
			<form on:submit={handleSearch}>
				<div class="search-input-wrapper">
					<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8"/>
						<path d="M21 21l-4.35-4.35"/>
					</svg>
					<input 
						type="text" 
						id="q" 
						name="q" 
						placeholder="Search anime..." 
						autocomplete="off" 
					/>
				</div>
				<button type="submit" class="search-btn" aria-label="Search">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</button>
			</form>
		</div>

		<!-- Right Section -->
		<div class="header-actions">
			<!-- Theme Toggle -->
			<button class="theme-toggle" on:click={toggleDarkMode} aria-label="Toggle theme">
				{#if $darkMode}
					<span class="theme-icon">🌙</span>
				{:else}
					<span class="theme-icon">☀️</span>
				{/if}
			</button>
		</div>
	</div>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 70px;
		z-index: 1000;
		background: rgba(15, 15, 35, 0.8);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.3s ease;
	}

	.header.scrolled {
		background: rgba(15, 15, 35, 0.95);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
	}

	.header-container {
		max-width: 1400px;
		height: 100%;
		margin: 0 auto;
		padding: 0 24px;
		display: flex;
		align-items: center;
		gap: 32px;
	}

	/* Logo */
	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		flex-shrink: 0;
	}

	.logo-icon {
		font-size: 28px;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.1); }
	}

	.logo-text {
		font-size: 22px;
		font-weight: 800;
		color: #f8fafc;
		letter-spacing: -0.5px;
	}

	.logo-accent {
		background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Search Box */
	.search-box {
		flex: 1;
		max-width: 500px;
	}

	.search-box form {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.search-input-wrapper {
		flex: 1;
		position: relative;
	}

	.search-icon {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		height: 18px;
		max-width: 18px;
		max-height: 18px;
		color: rgba(248, 250, 252, 0.4);
		pointer-events: none;
		flex-shrink: 0;
	}

	.search-box input {
		width: 100%;
		height: 46px;
		padding: 0 20px 0 50px;
		font-family: inherit;
		font-size: 14px;
		color: #f8fafc;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 25px;
		outline: none;
		transition: all 0.3s ease;
	}

	.search-box input::placeholder {
		color: rgba(248, 250, 252, 0.4);
	}

	.search-box input:focus {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(99, 102, 241, 0.5);
		box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
	}

	.search-btn {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		flex-shrink: 0;
	}

	.search-btn svg {
		width: 18px;
		height: 18px;
		color: white;
	}

	.search-btn:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
	}

	/* Header Actions */
	.header-actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-shrink: 0;
	}

	.theme-toggle {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.08);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}

	.theme-toggle:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: rotate(15deg);
	}

	.theme-icon {
		font-size: 20px;
	}

	/* Responsive */
	@media (max-width: 800px) {
		.header {
			height: 60px;
		}

		.header-container {
			padding: 0 16px;
			gap: 16px;
		}

		.logo-text {
			display: none;
		}

		.logo-icon {
			font-size: 24px;
		}

		.search-box {
			max-width: none;
		}

		.search-box input {
			height: 42px;
			padding: 0 16px 0 44px;
		}

		.search-icon {
			left: 14px;
			width: 16px;
			height: 16px;
		}

		.search-btn {
			width: 42px;
			height: 42px;
		}

		.theme-toggle {
			width: 40px;
			height: 40px;
		}
	}

	@media (max-width: 480px) {
		.header-container {
			gap: 10px;
		}

		.search-box input {
			height: 38px;
			font-size: 13px;
		}

		.search-btn {
			width: 38px;
			height: 38px;
		}

		.search-btn svg {
			width: 16px;
			height: 16px;
		}

		.theme-toggle {
			width: 36px;
			height: 36px;
		}

		.theme-icon {
			font-size: 16px;
		}
	}
</style>
