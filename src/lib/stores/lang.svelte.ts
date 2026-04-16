const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
const browserLang =
	typeof window !== 'undefined' && navigator.language.startsWith('da') ? 'da' : 'en';

let current = $state<'en' | 'da'>(stored === 'en' || stored === 'da' ? stored : browserLang);

export const lang = {
	get current() {
		return current;
	},
	toggle() {
		current = current === 'en' ? 'da' : 'en';
		localStorage.setItem('lang', current);
	},
};
