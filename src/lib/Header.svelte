<script lang="ts">
	import { onMount } from 'svelte';

	let darkMode = false;

	onMount(() => {
		// Check for saved dark mode preference
		if (localStorage.getItem('darkMode') === 'enabled') {
			darkMode = true;
			document.body.classList.add('dark');
		}
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		if (darkMode) {
			document.body.classList.add('dark');
			localStorage.setItem('darkMode', 'enabled');
		} else {
			document.body.classList.remove('dark');
			localStorage.setItem('darkMode', 'disabled');
		}
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
<div class="th" id="header">
	<div class="centernav">
		<div class="header-widget logos">
			<div class="header-image-wrapper">
				<img src="https://via.placeholder.com/192x50/0c70de/ffffff?text=KumaStream" alt="KumaStream Logo" />
			</div>
		</div>

		<div class="searchx">
			<form id="form" on:submit={handleSearch}>
				<input type="text" id="q" name="q" placeholder="Search anime..." autocomplete="off" />
				<button type="submit" id="cari" aria-label="Search"><i class="fa fa-search"></i></button>
			</form>
		</div>

		<div class="theme">
			<label class="switch">
				<input type="checkbox" id="darkModeToggle" checked={darkMode} on:change={toggleDarkMode} />
				<span class="geser round"></span>
			</label>
		</div>
	</div>
</div>

<style>
	:global(#header) {
		width: 100%;
	}
</style>
