<script lang="ts">
	import { goto } from '$app/navigation';
	import '$lib/styles/components/return-button.css';
	import { t } from '$lib/data/translations';
	import { lang } from '$lib/stores/lang.svelte';
	const labels = $derived(t[lang.current]);

	let { href = '/' }: { href?: string } = $props();
</script>

<button class="return-button" onclick={() => goto(href)}>← {labels.return}</button>
