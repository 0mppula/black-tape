import db from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const authHeader = req.headers.get('authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	console.log('Deleting messages older than 24 hours');

	// Delete messages that are older than 24 hours
	await db.message.deleteMany({
		where: {
			createdAt: {
				lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
			},
		},
	});

	return new Response('Messages older than 24 hours deleted successfully', {
		status: 200,
	});
}
