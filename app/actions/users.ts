'use server';

import { User } from '@/generated/prisma';
import db from '@/lib/db';
import { getAuthSession } from './auth';

export const getUsers = async (q: string): Promise<User[]> => {
	const session = await getAuthSession();

	if (!session || q.trim() === '') {
		return [];
	}

	const users = db.user.findMany({
		where: {
			OR: [
				{ name: { contains: q, mode: 'insensitive' } },
				{ email: { contains: q, mode: 'insensitive' } },
			],
		},
	});

	return users;
};
