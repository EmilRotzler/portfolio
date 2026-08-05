import passiveLearningImg from '$lib/assets/projects/passive-learning-app.png?w=1200&format=webp&quality=80&imagetools';
import ttsTestImg from '$lib/assets/projects/tts-test.png?w=1200&format=webp&quality=80&imagetools';
import portfolioImg from '$lib/assets/projects/portfolio.png?w=1200&format=webp&quality=80&imagetools';

export interface Project {
	title: string;
	description: string;
	image?: string;
	url: string;
	tags?: string[];
}

export const projects: Project[] = [
	{
		title: 'Passive Learning App',
		description:
			'Android home screen widget that rotates flashcard-style study content at configurable intervals for passive learning.',
		image: passiveLearningImg,
		url: 'https://github.com/EmilRotzler/passive-learning-app',
		tags: ['Android', 'Kotlin'],
	},
	{
		title: 'Text to Speech Test',
		description:
			'Local voice-cloning text-to-speech app using Coqui XTTS v2 on GPU, with a web UI for managing voices and generation parameters.',
		image: ttsTestImg,
		url: 'https://github.com/EmilRotzler/text-to-speech-test',
		tags: ['Python', 'TTS'],
	},
	{
		title: 'Portfolio',
		description:
			'This site — a personal portfolio built with SvelteKit 2 and Svelte 5 runes, featuring interactive canvas backgrounds and a printable CV.',
		image: portfolioImg,
		url: 'https://github.com/EmilRotzler/portfolio',
		tags: ['SvelteKit', 'TypeScript', 'CSS'],
	},
	{
		title: 'Weather App',
		description: 'Small ReactJS and Firebase project displaying weather data.',
		url: 'https://github.com/EmilRotzler/WeatherApp',
		tags: ['React', 'Firebase'],
	},
	{
		title: 'Product Translate',
		description:
			'Uses the Google Translate API to automatically translate product titles in the Smartweb CMS.',
		url: 'https://github.com/EmilRotzler/ProductTranslateSmartweb',
		tags: ['Google API', 'CMS'],
	},
];
