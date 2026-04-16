<script lang="ts">
	import type { Cv } from '$lib/data/cv';
	import '$lib/styles/components/experience.css';

	let { experience, label = 'Experience' }: Pick<Cv, 'experience'> & { label?: string } = $props();
</script>

<!-- // TODO: Add specifics and results, numbers are good -->
<section class="experience">
	<h2>{label}</h2>
	{#each experience as job}
		<div class="entry">
			<div class="entry-header">
				<div>
					<h3>{job.role}</h3>
					<p class="company">
						{#if job.website}
							<a href={job.website} target="_blank">{job.company}</a>
						{:else}
							{job.company}
						{/if}
						— {job.location}
					</p>
				</div>
				<span class="dates">{job.from} – {job.to}</span>
			</div>
			<ul>
				{#each job.bullets as bullet}
					<li>{bullet}</li>
				{/each}
			</ul>
		</div>
	{/each}
</section>
