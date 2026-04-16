<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
	import '$lib/styles/components/theme-toggle.css';
</script>

<button class="theme-toggle" onclick={theme.toggle} aria-label="Toggle dark mode">
	{theme.dark ? '☀' : '☾'}
</button>
