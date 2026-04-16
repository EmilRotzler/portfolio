const stored = typeof window !== 'undefined'
	? localStorage.getItem('theme')
	: null;

let dark = $state(stored !== 'light');

export const theme = {
	get dark() { return dark; },
	toggle() {
		dark = !dark;
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	},
};
