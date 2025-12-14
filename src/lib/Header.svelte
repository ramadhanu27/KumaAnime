<script lang="ts">
	import { onMount } from 'svelte';

	let isScrolled = false;

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function handleSearch(e: Event) {
		e.preventDefault();
		const query = (document.getElementById('q') as HTMLInputElement)?.value;
		if (query) {
			window.location.href = `/search?q=${encodeURIComponent(query)}`;
		}
	}
</script>

<header class:scrolled={isScrolled}>
	<div class="container">
		<a href="/" class="logo">
			<span class="logo-text">Kuma<span class="accent">Stream</span></span>
		</a>

		<form class="search" on:submit={handleSearch}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
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
		</form>

		<a href="/history" class="icon-btn" aria-label="History">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
				<circle cx="12" cy="12" r="10"/>
				<polyline points="12 6 12 12 16 14"/>
			</svg>
		</a>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 64px;
		z-index: 1000;
		background: #0f0f0f;
		border-bottom: 1px solid #27272a;
		transition: background 0.2s;
	}

	header.scrolled {
		background: rgba(15, 15, 15, 0.95);
		backdrop-filter: blur(8px);
	}

	.container {
		max-width: 1400px;
		height: 100%;
		margin: 0 auto;
		padding: 0 24px;
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.logo {
		display: flex;
		align-items: center;
		text-decoration: none;
		flex-shrink: 0;
	}

	.logo-text {
		font-size: 20px;
		font-weight: 700;
		color: #f4f4f5;
	}

	.accent {
		color: #facc15;
	}

	.search {
		flex: 1;
		max-width: 420px;
		position: relative;
		display: flex;
		align-items: center;
	}

	.search svg {
		position: absolute;
		left: 12px;
		color: #52525b;
		pointer-events: none;
	}

	.search input {
		width: 100%;
		height: 40px;
		padding: 0 16px 0 42px;
		font-family: inherit;
		font-size: 14px;
		color: #f4f4f5;
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 6px;
		outline: none;
		transition: border-color 0.2s;
	}

	.search input::placeholder {
		color: #52525b;
	}

	.search input:focus {
		border-color: #3f3f46;
	}

	.icon-btn {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #a1a1aa;
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 6px;
		text-decoration: none;
		transition: all 0.2s;
	}

	.icon-btn:hover {
		color: #f4f4f5;
		border-color: #3f3f46;
	}

	@media (max-width: 768px) {
		header {
			height: 56px;
		}

		.container {
			padding: 0 16px;
			gap: 12px;
		}

		.logo-text {
			font-size: 18px;
		}

		.search {
			max-width: none;
		}

		.search input {
			height: 36px;
			font-size: 13px;
		}

		.icon-btn {
			width: 36px;
			height: 36px;
		}
	}

	@media (max-width: 480px) {
		.logo-text {
			display: none;
		}

		.logo::before {
			content: 'KS';
			font-size: 18px;
			font-weight: 700;
			color: #facc15;
		}
	}
</style>
