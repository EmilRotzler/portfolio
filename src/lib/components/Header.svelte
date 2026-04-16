<script lang="ts">
	import type { Cv } from '$lib/data/cv';
	import '$lib/styles/components/header.css';

	let { name, title, contact, photo }: Pick<Cv, 'name' | 'title' | 'contact' | 'photo'> = $props();
</script>

<header class="cv-header">
	<div class="name-block">
		<h1>{name}</h1>
		<p class="title">{title}</p>
	</div>
	<ul class="contact">
		<li>{contact.location}</li>
		<li><a href="mailto:{contact.email}">{contact.email}</a></li>
		{#if contact.linkedin}
			<li><a href="https://{contact.linkedin}" target="_blank">{contact.linkedin}</a></li>
		{/if}
		{#if contact.github}
			<li><a href="https://{contact.github}" target="_blank">{contact.github}</a></li>
		{/if}
	</ul>
</header>
