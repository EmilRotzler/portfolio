import sailingImg from '$lib/assets/interests/sailing.jpg?w=1200&format=webp&quality=80&imagetools';
import gamingImg from '$lib/assets/interests/gaming.jpg?w=1200&format=webp&quality=80&imagetools';

// Shared data — language-independent

const cvShared = {
	name: 'Emil A. Rotzler',
	contact: {
		email: 'emilarotzler@hotmail.com',
		location: 'Aarhus, Danmark',
		linkedin: 'linkedin.com/in/emil-rotzler/',
		github: 'github.com/EmilRotzler',
	},
	photo: '/photo.jpg',
	skills: {
		Programming: [
			{ name: 'JavaScript / Typescript', rating: 5 },
			{ name: 'C#', rating: 5 },
			{ name: 'HTML', rating: 5 },
			{ name: 'CSS', rating: 4 },
			{ name: 'PHP', rating: 3 },
			{ name: 'SQL', rating: 2 },
		],
		Frameworks: [
			{ name: 'React.js', rating: 5 },
			{ name: '.NET', rating: 5 },
			{ name: 'React Native', rating: 5 },
			{ name: 'Entity Framework', rating: 5 },
			{ name: 'Elastic stack (ELK)', rating: 3 },
			{ name: 'Laravel', rating: 3 },
			{ name: 'Angular', rating: 1 },
			{ name: 'Svelte / SvelteKit', rating: 1 },
		],
		Tools: [
			{ name: 'Git', rating: 5 },
			{ name: 'CI/CD', rating: 3 },
			{ name: 'Docker', rating: 3 },
		],
		'Operating Systems': [
			{ name: 'Windows', rating: 5 },
			{ name: 'Linux', rating: 3 },
			{ name: 'MacOs', rating: 2 },
		],
		Platforms: [
			{ name: 'Microsoft Azure', rating: 3 },
			{ name: 'AWS', rating: 2 },
		],
	},
	experience: [
		{
			company: 'itpilot ApS',
			location: 'Viborg, Danmark',
			website: 'https://itpilot.dk',
			from: 'Jan 2021',
			to: 'Present',
		},
		{
			company: 'Startup IntegrateXL',
			location: 'Aarhus, Danmark',
			from: 'Jan 2020',
			to: 'Sep 2020',
		},
		{
			company: 'SoundStoreXL A/S',
			location: 'Aarhus, Danmark',
			website: 'https://soundstorexl.com',
			from: 'Feb 2018',
			to: 'Dec 2019',
		},
	],
	education: [
		{
			institution: 'Erhvervsakademi Aarhus',
			location: 'Aarhus, Danmark',
			from: '2016',
			to: '2020',
		},
	],
	interests: [
		{ subject: 'Sailing', image: sailingImg },
		{ subject: 'Gaming', image: gamingImg },
		{ subject: 'Fitness', image: '/interests/fitness.jpg' },
	],
};

// Translations — language-specific content

const cvTranslations = {
	en: {
		title: 'Full Stack Developer',
		personalTitle: 'Full Stack Tinkerer',
		aboutProfessional:
			'I am a developer who loves solving complex problems, piecing together the puzzle, and finding thorough solutions. Open to learning new languages and frameworks to solve tasks in the best possible way. Works well in a team or independently. I like to take initiative on tasks that matter to the project I am working on. Experienced with APIs and connecting systems.',
		aboutPersonal:
			'Outside of work I spend my time sailing whenever the weather allows, competing in strategy games, and keeping active at the gym. I enjoy tinkering with side project, building things that are both functional and a little bit fun.',
		experience: [
			// NOTES FOR ADDING EXPERIENCE:
			// Always be as specific as possible, numbers and solutions
			{
				role: 'Full Stack Developer',
				bullets: [
					// Generic
					'Architect for features / projects from idea to finished product',
					'Experience with coding advanced project management systems with template creation and editing',
					// Specific solutions
					'Developed SSO authentication for Microsoft accounts',
					'Made a native to React Native bridge for Push messages in Ios',
					'Added server side caching for API requests, resulting in 30% faster initial page load',
					'Created a filehandling system for uploading and storing files on storage drive',
					'Automated testing through CI/CD pipeline',
					'Added localization (language and time) handling in fully custom project',
				],
			},
			{
				role: 'Web Developer',
				bullets: [
					'Solo Developer of an Automated integration platform between Smartweb and a handful of other platforms (Elkjop, Bilka and Others)',
					'Development of a new marketplace website',
				],
			},
			{
				role: 'Web Developer',
				bullets: [
					'Running integrations on local server and later creating Azure hosted programs for reliability',
					'Developer on 5-10 integrations to and from a webshop for orders and inventory (Elkjop, Bilka and Others)',
					'Design adjustments and scripting on parts of the website',
				],
			},
		],
		education: [{ degree: 'Professional Bachelor in Web Development' }],
		interests: [
			{
				subject: 'Sailing',
				description:
					"I sail as much as I can. I like the technical discipline it requires, there's always something to learn about the boat, the weather, or the water.\n\n" +
					'Have raced in several seasons of competitive sailing at my local sailing club.\n\n' +
					'Volunteered at the club for various events, including the Haarup Mixer Cup — the Danish championship in the H-boat class.',
			},
			{
				subject: 'Gaming',
				description:
					'Both video and board games, strategy is my favourite genre.\n\n' +
					'Have attended Gamescom in Cologne, Germany multiple times with friends.\n\n' +
					'Was part of a small team that organised LAN parties for 100+ people during high school.',
			},
			{
				subject: 'Fitness',
				description:
					'Go to the gym 3 times a week and run during the warmer months.\n\n' +
					'Have participated in the "Nordic Lake Festival" in Viborg multiple times, running as part of a relay team.\n\n' +
					'Hit a 100 kg bench press.',
			},
		],
		skills: {
			Languages: [
				{ name: 'Danish', rating: 5 },
				{ name: 'English', rating: 5 },
				{ name: 'German', rating: 2 },
				{ name: 'Japanese', rating: 1 },
			],
		},
	},
	da: {
		title: 'Full Stack Udvikler',
		personalTitle: 'Fuld Stack Tinkerer',
		aboutProfessional:
			'Jeg er en udvikler der elsker at løse komplekse opgaver, at løse puslespillet, og at finde frem til fyldestgørende løsninger. Er indstillet på at lære nye sprog og frameworks til at løse opgaven på den bedst mulige måde. Arbejder godt i hold, eller alene. Kan godt lide at tage initiativ på opgaver der er vigtige for det projekt jeg arbejder på.',
		aboutPersonal:
			'Uden for arbejdet bruger jeg min tid på at sejle når vejret tillader det, konkurrere i strategispil og holde mig i form i fitness centeret.',
		experience: [
			{
				role: 'Full Stack Udvikler',
				bullets: [
					'Arkitekt for features / projekter fra idé til færdigt produkt',
					'Erfaring med udvikling af avancerede projektstyringssystemer med oprettelse og redigering af skabeloner',
					'Udviklede SSO-autentificering til Microsoft-konti',
					'Oprettede en native kode til React Native bro for push-beskeder på iOS',
					'Tilføjede server-side caching af API-forespørgsler, hvilket resulterede i 30% hurtigere initial sideindlæsning',
					'Oprettede et filhåndteringssystem til upload og opbevaring af filer på lagerdrev',
					'Automatiseret testning via CI/CD pipeline',
					'Tilføjede lokalisering (sprog og tid) i fuldt custom kodet projekt',
				],
			},
			{
				role: 'Webdudvikler',
				bullets: [
					'Solo udvikler på automatiseret integrationsplatform mellem Smartweb og en række andre platforme (Elkjop, Bilka og andre)',
					'Udvikling af ny markedsplads hjemmeside',
				],
			},
			{
				role: 'Webdudvikler',
				bullets: [
					'Kørte integrationer på lokal server og oprettede efterfølgende Azure-hostede programmer for pålidelighed',
					'Udvikler på 5-10 integrationer til og fra webshop for ordrer og lager (Elkjop, Bilka og andre)',
					'Designjusteringer og scripting på dele af hjemmesiden',
				],
			},
		],
		education: [{ degree: 'Professionsbachelor i Webudvikling' }],
		interests: [
			{
				subject: 'Sejlads',
				description:
					'Jeg sejler så meget jeg kan. Jeg kan godt lide den tekniske disciplin det kræver, der er altid noget nyt at lære om båden, vejret eller vandet.\n\n' +
					'Har i flere sæsoner sejlet med til kapsejlads i min sejlklub. \n\n' +
					'Har været frivillig i seljklubben for forskellige events såsom Haarup Mixer Cup som er Danmarks mesterskab i H-båd bådklassen.',
			},
			{
				subject: 'Spil',
				description:
					'Både computer- og brætspil, strategi er min favorit genre.\n\n' +
					'Har deltaget i Gamescom Köln, spilkonvention i tyskland, af flere omgange med venner. \n\n' +
					'Har været med i et lille hold der organiserede LAN parties på 100+ mennesker i gymnasiet.',
			},
			{
				subject: 'Fitness',
				description:
					'Går i fitness center 3 gange om ugen, og løber i de varme måneder. \n\n' +
					'Har deltaget til "Nordic Lake Festival" i viborg af flere omgange hvor jeg har løbet stafet. \n\n' +
					'Har ramt 100 kg bænkpres.',
			},
		],
		skills: {
			Languages: [
				{ name: 'Dansk', rating: 5 },
				{ name: 'Engelsk', rating: 5 },
				{ name: 'Tysk', rating: 2 },
				{ name: 'Japansk', rating: 1 },
			],
		},
	},
};

// Compose a full CV for a given language

export function getCv(lang: 'en' | 'da'): Cv {
	const t = cvTranslations[lang];
	return {
		name: cvShared.name,
		title: t.title,
		personalTitle: t.personalTitle,
		contact: cvShared.contact,
		photo: cvShared.photo,
		aboutProfessional: t.aboutProfessional,
		aboutPersonal: t.aboutPersonal,
		experience: cvShared.experience.map((exp, i) => ({ ...exp, ...t.experience[i] })),
		education: cvShared.education.map((edu, i) => ({ ...edu, ...t.education[i] })),
		interests: cvShared.interests.map((int, i) => ({ ...int, ...t.interests[i] })),
		skills: { ...cvShared.skills, ...t.skills },
	};
}

// Types

export interface Cv {
	name: string;
	title: string;
	personalTitle: string;
	contact: Contact;
	photo?: string;
	aboutProfessional: string;
	aboutPersonal: string;
	experience: Experience[];
	education: Education[];
	interests: Interest[];
	skills: Record<string, Skill[]>;
}

interface Contact {
	email: string;
	location: string;
	linkedin?: string;
	github?: string;
}

interface Experience {
	role: string;
	company: string;
	location: string;
	website?: string;
	from: string;
	to: string;
	bullets: string[];
}

interface Education {
	degree: string;
	institution: string;
	location: string;
	from: string;
	to: string;
}

export interface Interest {
	subject: string;
	description: string;
	image?: string;
}

export interface Skill {
	name: string;
	rating: number;
}
