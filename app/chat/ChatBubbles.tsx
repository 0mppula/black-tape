'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MESSAGES_QUERY_KEY } from '@/constants';
import useChatStore from '@/hooks/useChatStore';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { getMessages } from '../actions/chat';

const ChatBubbles = () => {
	const { activeChat, chatCreateIsLoading } = useChatStore();
	const { data: userData } = useSession();

	const {
		data: messages,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [MESSAGES_QUERY_KEY, activeChat?.id],
		queryFn: () => getMessages(activeChat?.id || ''),
		enabled: !!activeChat?.id,
		refetchInterval: 1_000 * 5, // 5 seconds
	});

	if (isLoading || chatCreateIsLoading)
		return (
			<>
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton
						key={index}
						className={cn(
							'h-14 text-primary-foreground w-full sm:w-11/12 p-2 py-3 bg-muted',
							index % 2 === 0 ? 'self-end' : 'self-start'
						)}
					/>
				))}
			</>
		);

	if (isError) return <p>Failed to load messages.</p>;
	if (!messages) return <p>No messages found.</p>;

	return (
		<>
			{messages.map((message) => (
				<Card
					key={message.id}
					className={cn(
						'gap-0 text-primary-foreground w-full sm:w-11/12 p-2 py-3 bg-muted',
						userData?.user.id === message.senderId
							? 'self-end bg-primary'
							: 'self-start text-primary'
					)}
				>
					<p className="leading-7 [&:not(:first-child)]:mt-6">{message.content}</p>

					<span
						className={cn(
							'text-[10px] text-right',
							userData?.user.id === message.senderId
								? 'text-[#828080] dark:text-[#686666]'
								: 'text-muted-foreground'
						)}
					>
						{format(message.createdAt, 'PPP p')}
					</span>
				</Card>
			))}
		</>
	);
};

export default ChatBubbles;
