import { PrismaClient } from '@/generated/prisma/client';

declare global {
	let prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
	globalThis.prisma = client;
}

export default client;
