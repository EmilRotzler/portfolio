<script lang="ts">
	import ReturnButton from '$lib/components/ReturnButton.svelte';
	import LangToggle from '$lib/components/LangToggle.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import '$lib/styles/components/page-layout.css';

	let { children, actions }: { children: import('svelte').Snippet; actions?: import('svelte').Snippet } = $props();
</script>

<div class="page-actions no-print">
	<ReturnButton />
	<div class="page-actions-toggles">
		<LangToggle />
		<ThemeToggle />
	</div>
	{#if actions}
		<div class="page-actions-extra">
			{@render actions()}
		</div>
	{/if}
</div>

<main class="page-content">
	{@render children()}
</main>
