<script lang="ts">
	import '$lib/styles/components/about.css';

	let { about, label = 'About' }: { about: string; label?: string } = $props();
</script>

<section class="about">
	<h2>{label}</h2>
	<p>{about}</p>
</section>
