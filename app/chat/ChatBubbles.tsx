'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const TEST_ACTIVE_USER_ID = '1';

const TEST_CHAT_MESSAGES = [
	{
		id: '1',
		senderId: '1',
		receiverId: '2',
		message: 'Hello, how are you?',
		timestamp: new Date(),
	},
	{
		id: '2',
		senderId: '2',
		receiverId: '1',
		message: 'I am fine, thank you!',
		timestamp: new Date(),
	},
	{
		id: '3',
		senderId: '1',
		receiverId: '2',
		message: 'What about you?',
		timestamp: new Date(),
	},
	{
		id: '4',
		senderId: '2',
		receiverId: '1',
		message: 'I am doing great!',
		timestamp: new Date(),
	},
	{
		id: '5',
		senderId: '1',
		receiverId: '2',
		message: 'What are you up to?',
		timestamp: new Date(),
	},
	{
		id: '6',
		senderId: '2',
		receiverId: '1',
		message: 'Just working on some projects.',
		timestamp: new Date(),
	},
];

const ChatBubbles = () => {
	return (
		<>
			{TEST_CHAT_MESSAGES.map((message) => (
				<Card
					key={message.id}
					className={cn(
						'text-primary-foreground w-full sm:w-11/12 p-2 py-3 bg-muted',
						TEST_ACTIVE_USER_ID === message.senderId
							? 'self-end bg-primary'
							: 'self-start text-primary'
					)}
				>
					<p className="leading-7 [&:not(:first-child)]:mt-6">{message.message}</p>
				</Card>
			))}
		</>
	);
};

export default ChatBubbles;
