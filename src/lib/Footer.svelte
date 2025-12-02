<script lang="ts">
	import { onMount } from 'svelte';

	let showBackToTop = false;

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
<div id="kaki">
	<div class="menu-kaki">
		<div class="list-kaki">
			<div id="LinkList2">
				<ul>
					<li><a href="/about">About</a></li>
					<li><a href="/contact">Contact</a></li>
					<li><a href="/privacy">Privacy Policy</a></li>
					<li><a href="/dmca">DMCA</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="kaki-info">
		<div class="infonya">
			<p>© 2025 KumaStream. All Rights Reserved.</p>
			<p>Download Anime Subtitle Indonesia Batch Streaming Anime Sub Indo Free</p>
		</div>
	</div>
</div>

<!-- Back to Top Button -->
<div class="ignielToTop" class:show={showBackToTop} on:click={scrollToTop} role="button" tabindex="0">
	<i class="fa fa-arrow-up"></i>
</div>

<style>
	:global(#kaki) {
		width: 100%;
	}

	:global(.ignielToTop) {
		cursor: pointer;
	}
</style>
