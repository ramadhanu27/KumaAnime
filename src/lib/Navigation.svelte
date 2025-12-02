<script lang="ts">
	import { onMount } from 'svelte';

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
		const menu = document.getElementById('menu');
		if (menu) {
			menu.classList.toggle('show');
		}
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

<!-- Navigation Menu -->
<div id="menu" class:show={menuOpen}>
	<div class="centernav">
		<div class="dropdown">
			<i class="fa fa-bars"></i>
		</div>
		<ul class="menu">
			<li><a href="/">Home</a></li>
			<li><a href="/anime-list">Anime List</a></li>
			<li><a href="/ongoing">Ongoing</a></li>
			<li><a href="/complete">Complete</a></li>
			<li><a href="/schedule">Schedule</a></li>
		</ul>
		<a href="/random" id="btn-randrom">Random</a>
	</div>
</div>

<style>
	:global(#menu) {
		width: 100%;
	}
</style>
