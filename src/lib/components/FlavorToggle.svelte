<script lang="ts">
	import { flavor } from '$lib/stores/flavor.svelte';
	import '$lib/styles/components/flavor-toggle.css';

	const icons: Record<string, string> = {
		//none: '○',
		mesh: '⊞',
		code: '</>',
		ocean: '≋',
		sand: '⠿',
		matrix: '꩜',
	};
</script>

<button class="flavor-toggle" onclick={flavor.next} aria-label="Toggle flavor">
	{icons[flavor.current]}
</button>
