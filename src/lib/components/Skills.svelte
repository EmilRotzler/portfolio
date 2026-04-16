<script lang="ts">
	import type { Cv } from '$lib/data/cv';
	import '$lib/styles/components/skills.css';

	let { skills, label = 'Skills' }: Pick<Cv, 'skills'> & { label?: string } = $props();
</script>

<section class="skills">
	<h2>{label}</h2>
	<dl>
		{#each Object.entries(skills) as [category, items]}
			<div class="category">
				<dt>{category}</dt>
				<div class="items">
					{#each items as skill}
						<dd>
							<span class="skill-name">{skill.name}</span>
							<span class="dots" aria-label="Rating: {skill.rating} out of 5">
								{#each [1,2,3,4,5] as n}
									<span class="dot" class:filled={n <= skill.rating}></span>
								{/each}
							</span>
						</dd>
					{/each}
				</div>
			</div>
		{/each}
	</dl>
</section>
