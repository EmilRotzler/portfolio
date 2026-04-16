<script lang="ts">
	import '$lib/styles/variables.css';
	import '$lib/styles/global.css';
	import '$lib/styles/typography.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LangToggle from '$lib/components/LangToggle.svelte';
	import FlavorToggle from '$lib/components/FlavorToggle.svelte';
	import SideNav from '$lib/components/SideNav.svelte';

	let { children } = $props();

	const isHome = $derived(page.url.pathname === '/');

	$effect(() => {
		document.documentElement.dataset.theme = theme.dark ? 'dark' : 'light';
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
			transition.ready.catch(() => resolve());
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if !isHome}
	<SideNav />
{/if}

<div class="layout-toggle no-print" class:hide-mobile={!isHome}>
	<span style={isHome ? '' : 'visibility: hidden; pointer-events: none;'}>
		<FlavorToggle />
	</span>
	<LangToggle />
	<ThemeToggle />
</div>

<div class:with-sidenav={!isHome}>
	{@render children()}
</div>
