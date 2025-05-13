import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getUserInitials = (username: string) => {
	return (
		username ||
		'AZ'
			?.split(' ', 2)
			.map((name) => name[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	);
};
