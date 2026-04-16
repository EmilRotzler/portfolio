const flavors = [
	//'none',
	'mesh',
	'code',
	'ocean',
	'sand',
	'matrix',
] as const;
export type Flavor = (typeof flavors)[number];

const stored = typeof window !== 'undefined' ? localStorage.getItem('flavor') : null;
const initial: Flavor = flavors.includes(stored as Flavor) ? (stored as Flavor) : 'mesh';

let current = $state<Flavor>(initial);

export const flavor = {
	get current() {
		return current;
	},
	next() {
		const i = (flavors.indexOf(current) + 1) % flavors.length;
		current = flavors[i];
		localStorage.setItem('flavor', current);
	},
};
