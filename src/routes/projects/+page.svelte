<script lang="ts">
	import { getCv } from '$lib/data/cv';
	import { lang } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';
	import { projects } from '$lib/data/projects';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import '$lib/styles/projects.css';

	const cv = $derived(getCv(lang.current));
	const labels = $derived(t[lang.current]);

	let query = $state('');

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return projects;
		return projects.filter(p =>
			p.title.toLowerCase().includes(q) ||
			p.description.toLowerCase().includes(q) ||
			p.tags?.some(tag => tag.toLowerCase().includes(q))
		);
	});
</script>

<svelte:head>
	<title>{cv.name} — {labels.projects}</title>
</svelte:head>

<PageLayout>
	<h1>{labels.projects}</h1>

	<input
		class="projects-search"
		type="search"
		placeholder={labels.searchProjects}
		bind:value={query}
	/>

	<div class="projects-grid">
		{#each filtered as project}
			<a class="project-card" href={project.url} target="_blank" rel="noopener noreferrer">
				{#if project.image}
					<img class="project-image" src={project.image} alt={project.title} />
				{:else}
					<div class="project-image--placeholder"></div>
				{/if}
				<div class="project-body">
					<div class="project-title">{project.title}</div>
					<div class="project-description">{project.description}</div>
					{#if project.tags?.length}
						<div class="project-tags">
							{#each project.tags as tag}
								<span>{tag}</span>
							{/each}
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</PageLayout>
