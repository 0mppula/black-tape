'use server';

import { User } from '@/generated/prisma';
import db from '@/lib/db';
import { FormSchema } from '@/schemas';
import { getAuthSession } from './auth';

export const createChat = async (participant: string) => {
	const session = await getAuthSession();

	if (!session) return null;

	// Check if chat already exists
	const participantsSet = [session.user.id, participant].sort();

	const existingChat = await db.chat.findFirst({
		where: {
			participants: {
				equals: participantsSet,
			},
		},
	});

	if (existingChat) {
		return existingChat;
	}

	const chat = await db.chat.create({
		data: {
			participants: [session.user.id, participant],
		},
	});

	return chat;
};

export const getMessages = async (chatId: string) => {
	const session = await getAuthSession();

	if (!session) return [];

	const chats = await db.message.findMany({
		where: {
			chatId,
		},
		orderBy: {
			createdAt: 'asc',
		},
	});

	return chats;
};

export const getChatParticipant = async (chatId: string): Promise<User | null> => {
	const session = await getAuthSession();

	if (!session) return null;

	const chat = await db.chat.findUnique({
		where: {
			id: chatId,
		},
		select: {
			participants: true,
		},
	});

	if (!chat) return null;

	// Fetch the User objects based on the user IDs in participants
	const participants: User[] = await db.user.findMany({
		where: {
			id: { in: chat.participants },
		},
	});

	// Filter out the logged-in user from the participants list if only if over 1 participant
	const participant =
		participants.length > 1
			? participants.filter((user) => user.id !== session.user.id)
			: [...participants];

	return participant[0];
};

export const sendMessage = async (chatId: string, content: string) => {
	const session = await getAuthSession();

	if (!session) return null;

	const parsed = FormSchema.parse({ content });

	const message = await db.message.create({
		data: {
			content: parsed.content,
			chatId,
			senderId: session.user.id,
		},
	});

	return message;
};
