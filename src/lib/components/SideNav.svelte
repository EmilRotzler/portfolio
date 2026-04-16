<script lang="ts">
	import { page } from '$app/state';
	import { lang } from '$lib/stores/lang.svelte';

	import { t } from '$lib/data/translations';
	import '$lib/styles/components/side-nav.css';

	const labels = $derived(t[lang.current]);

	const links = $derived([
		{ href: '/', label: labels.home },
		{ href: '/projects', label: labels.projects },
		{ href: '/cv', label: labels.cv },
		{ href: '/about', label: labels.about },
		{ href: '/contact', label: labels.contact },
	]);

	const startYear = 2026;
	const currentYear = new Date().getFullYear();
	const yearRange = currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`;
</script>

<nav class="side-nav no-print">
	<div class="side-nav-links">
		{#each links as link}
			<a href={link.href} class:active={page.url.pathname === link.href}>
				{link.label}
			</a>
		{/each}
	</div>
	<p class="side-nav-copyright">© {yearRange} Emil A. Rotzler</p>
</nav>
