<script lang="ts">
	import { lang } from '$lib/stores/lang.svelte';
	import '$lib/styles/components/lang-toggle.css';
</script>

<button class="lang-toggle" onclick={lang.toggle}>
	{lang.current === 'en' ? 'DA' : 'EN'}
</button>
