<script lang="ts">
	import { getCv } from '$lib/data/cv';
	import { lang } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';
	import '$lib/styles/cv.css';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import Header from '$lib/components/Header.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Education from '$lib/components/Education.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Interests from '$lib/components/Interests.svelte';

	const cv = $derived(getCv(lang.current));
	const labels = $derived(t[lang.current]);
</script>

<svelte:head>
	<title>{cv.name} — CV</title>
</svelte:head>

<PageLayout>
	{#snippet actions()}
		<button class="print-btn" onclick={() => window.print()}>Print / Save as PDF</button>
	{/snippet}

	<Header name={cv.name} title={cv.title} contact={cv.contact} photo={cv.photo} />
	<div class="cv-body">
		<aside class="cv-sidebar">
			<Skills skills={cv.skills} label={labels.skills} />
		</aside>
		<div class="cv-main">
			<About about={cv.aboutProfessional} label={labels.about} />
			<Experience experience={cv.experience} label={labels.experience} />
			<Education education={cv.education} label={labels.education} />
			<Interests interests={cv.interests} label={labels.interests} />
		</div>
	</div>
</PageLayout>
