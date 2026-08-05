const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;

let current = $state<'en' | 'da'>(stored === 'en' || stored === 'da' ? stored : 'da');

export const lang = {
	get current() {
		return current;
	},
	toggle() {
		current = current === 'en' ? 'da' : 'en';
		localStorage.setItem('lang', current);
	},
};
