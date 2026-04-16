export interface Social {
	name: string;
	icon: string; // Iconify icon name
	href: string;
}

export const socials: Social[] = [
	{ name: 'GitHub', icon: 'simple-icons:github', href: 'https://github.com/EmilRotzler' },
	{
		name: 'LinkedIn',
		icon: 'simple-icons:linkedin',
		href: 'https://linkedin.com/in/emil-rotzler/',
	},
	{ name: 'Email', icon: 'simple-icons:gmail', href: 'mailto:emilarotzler@hotmail.com' },
	{
		name: 'Discord',
		icon: 'simple-icons:discord',
		href: 'https://discord.com/users/643408368081436672',
	},
	// { name: 'Steam', icon: 'simple-icons:steam', href: 'https://steamcommunity.com/id/Robotzler/' },
	// {
	// 	name: 'Instagram',
	// 	icon: 'simple-icons:instagram',
	// 	href: 'https://www.instagram.com/emilrotzler/',
	// },
];
