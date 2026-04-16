export interface Project {
	title: string;
	description: string;
	image?: string;
	url: string;
	tags?: string[];
}

export const projects: Project[] = [
	{
		title: 'Portfolio',
		description:
			'This site — a personal portfolio built with SvelteKit 2 and Svelte 5 runes, featuring interactive canvas backgrounds and a printable CV.',
		url: 'https://github.com/EmilRotzler/svelte-app',
		tags: ['SvelteKit', 'TypeScript', 'CSS'],
	},
	{
		title: 'Weather App',
		description: 'Small ReactJS and Firebase project displaying weather data.',
		url: 'https://github.com/EmilRotzler/WeatherApp',
		tags: ['React', 'Firebase'],
	},
	{
		title: 'Custom Data Copy',
		description:
			'Tool to copy custom data text from one language onto the others for the same custom data entry.',
		url: 'https://github.com/EmilRotzler/CustomDataCopySW',
		tags: ['Utility'],
	},
	{
		title: 'Tic Tac Toe',
		description: 'Simple ReactJS tic-tac-toe game running in the browser.',
		url: 'https://github.com/EmilRotzler/tic-tac-toe-ReactJS',
		tags: ['React'],
	},
	{
		title: 'Tour of Heroes',
		description:
			'Angular content listing and navigation project based on the official Angular tutorial.',
		url: 'https://github.com/EmilRotzler/TourOfHeroes-Angular',
		tags: ['Angular', 'TypeScript'],
	},
	{
		title: 'Product Translate',
		description:
			'Uses the Google Translate API to automatically translate product titles in the Smartweb CMS.',
		url: 'https://github.com/EmilRotzler/ProductTranslateSmartweb',
		tags: ['Google API', 'CMS'],
	},
	{
		title: 'Coin Collector',
		description: 'Android game project.',
		url: 'https://github.com/EmilRotzler/CoinCollector',
		tags: ['Android', 'Java'],
	},
	{
		title: 'Shopping List',
		description: 'Android shopping list app backed by Google Firebase for real-time sync.',
		url: 'https://github.com/EmilRotzler/ShoppingList-Master',
		tags: ['Android', 'Firebase'],
	},
];
