<script lang="ts">
	import type { Cv } from '$lib/data/cv';
	import '$lib/styles/components/interests.css';

	let { interests, label = 'Interests'}: Pick<Cv, 'interests'> & { label?: string } = $props();
</script>

<section class="interests">
	<h2>{label}</h2>
	<p class="interests-list">
		{#each interests as item, i}
			<span title={item.description}>{item.subject}</span>{#if i < interests.length - 1}<span class="sep"> · </span>{/if}
		{/each}
	</p>
</section>
