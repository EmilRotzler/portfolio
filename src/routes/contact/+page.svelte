<script lang="ts">
	import { getCv } from '$lib/data/cv';
	import { lang } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';
	import { socials } from '$lib/data/contact';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import Icon from '@iconify/svelte';
	import '$lib/styles/contact.css';

	const cv = $derived(getCv(lang.current));
	const labels = $derived(t[lang.current]);
</script>

<svelte:head>
	<title>{cv.name} — {labels.contact}</title>
</svelte:head>

<PageLayout>
	<h1>{labels.contact}</h1>
	<p class="contact-description">{labels.contactDescription}</p>

	<div class="contact-socials">
		{#each socials as social}
			<a
				class="social-btn"
				href={social.href}
				title={social.name}
				target={social.href.startsWith('mailto') ? undefined : '_blank'}
				rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
			>
				<Icon icon={social.icon} />
			</a>
		{/each}
	</div>
</PageLayout>
