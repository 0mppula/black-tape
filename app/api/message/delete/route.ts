import db from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Delete messages that are older than 24 hours
	await db.message.deleteMany({
		where: {
			createdAt: {
				lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
			},
		},
	});
}
