<script lang="ts">
	import type { Cv } from '$lib/data/cv';
	import '$lib/styles/components/education.css';

	let { education, label = 'Education' }: Pick<Cv, 'education'> & { label?: string } = $props();
</script>

<section class="education">
	<h2>{label}</h2>
	{#each education as edu}
		<div class="entry">
			<div class="entry-header">
				<div>
					<h3>{edu.degree}</h3>
					<p class="institution">{edu.institution} — {edu.location}</p>
				</div>
				<span class="dates">{edu.from} – {edu.to}</span>
			</div>
		</div>
	{/each}
</section>
