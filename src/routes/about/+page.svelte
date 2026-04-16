<script lang="ts">
	import { getCv } from '$lib/data/cv';
	import { lang } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import '$lib/styles/about.css';

	const cv = $derived(getCv(lang.current));
	const labels = $derived(t[lang.current]);

	let sectionEls: HTMLElement[] = [];

	$effect(() => {
		function onScroll() {
			for (const el of sectionEls) {
				const rect = el.getBoundingClientRect();
				const center = rect.top + rect.height / 2 - window.innerHeight / 2;
				el.style.setProperty('--py', `${center * 0.25}px`);
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<svelte:head>
	<title>{cv.name} — {labels.about}</title>
</svelte:head>

<PageLayout>
	<h1>{labels.about}</h1>

	<div class="about-intro">
		<p class="subtitle">{cv.personalTitle}</p>
		<p>{cv.aboutPersonal}</p>
	</div>

	<div class="about-section">
		<h2>{labels.interests}</h2>
		<div class="interest-list">
			{#each cv.interests as interest, i}
				<div class="interest-item" bind:this={sectionEls[i]}>
					{#if interest.image}
						<div class="interest-image">
							<img src={interest.image} alt={interest.subject} />
						</div>
					{:else}
						<div class="interest-image interest-image--placeholder"></div>
					{/if}
					<div class="interest-body">
						<div class="subject">{interest.subject}</div>
						<div class="description">{interest.description}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</PageLayout>
