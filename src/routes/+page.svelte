<script lang="ts">
	import { getCv } from '$lib/data/cv';
	import { lang } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';
	import { flavor } from '$lib/stores/flavor.svelte';
	import MeshBg from '$lib/components/MeshBg.svelte';
	import OceanBg from '$lib/components/OceanBg.svelte';
	import SandBg from '$lib/components/SandBg.svelte';
	import CodeBg from '$lib/components/CodeBg.svelte';
	import MatrixBg from '$lib/components/MatrixBg.svelte';
	import '$lib/styles/home.css';

	const cv = $derived(getCv(lang.current));
	const labels = $derived(t[lang.current]);

</script>

<svelte:head>
	<title>{cv.name}</title>
</svelte:head>

<main class="home" data-flavor={flavor.current}>
	{#if flavor.current === 'mesh'}
		<MeshBg />
	{:else if flavor.current === 'ocean'}
		<OceanBg />
	{:else if flavor.current === 'sand'}
		<SandBg />
	{:else if flavor.current === 'code'}
		<CodeBg />
	{:else if flavor.current === 'matrix'}
		<MatrixBg />
	{/if}
	<div class="home-content">
		<div class="home-header">
			<h1>{cv.name}</h1>
			<p>{cv.title}</p>
		</div>
		<nav>
			<a href="/projects">{labels.projects}</a>
			<a href="/cv">{labels.cv}</a>
			<a href="/about">{labels.about}</a>
			<a href="/contact">{labels.contact}</a>
		</nav>
	</div>
</main>

<!-- Prerender interest images so they are fully decoded before /about is visited -->
<div aria-hidden="true" style="position:fixed;width:0;height:0;overflow:hidden;pointer-events:none;">
	{#each cv.interests as interest}
		{#if interest.image}
			<img src={interest.image} alt="" />
		{/if}
	{/each}
</div>
