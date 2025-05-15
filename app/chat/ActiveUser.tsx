'use client';

import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { CHAT_PARTICIPANT_QUERY_KEY } from '@/constants';
import useSearchQueryStore from '@/hooks/useChatStore';
import { getUserInitials } from '@/lib/utils';
import { Avatar } from '@radix-ui/react-avatar';
import { useQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';
import { getChatParticipant } from '../actions/chat';

const ActiveUser = () => {
	const { activeChat, chatCreateIsLoading } = useSearchQueryStore();

	const {
		data: chatParticipant,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [CHAT_PARTICIPANT_QUERY_KEY, activeChat?.id],
		queryFn: () => getChatParticipant(activeChat?.id || ''),
		enabled: !!activeChat?.id,
	});

	if (isLoading || chatCreateIsLoading) {
		return (
			<div className="flex items-center gap-4 mb-2 border-b pb-2">
				<Skeleton className="h-10 w-10 rounded-full" aria-label="Loading avatar..." />

				<Skeleton className="h-7 w-[200px] rounded-md" aria-label="Loading user..." />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex items-center gap-4 mb-2 border-b pb-2">
				<Avatar className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border">
					<User className="rounded-full overflow-hidden text-destructive" />
				</Avatar>

				<h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
					Error loading user
				</h2>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-4 mb-2 border-b pb-2">
			{chatParticipant ? (
				<>
					<Avatar className="w-10 h-10 rounded-full border-2 border-border">
						<AvatarImage
							className="rounded-full"
							src={chatParticipant?.image || undefined}
						/>
						<AvatarFallback>
							{getUserInitials(chatParticipant?.name || '')}
						</AvatarFallback>
					</Avatar>

					<h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
						{chatParticipant?.name || 'Select a user'}
					</h2>
				</>
			) : (
				<>
					<Avatar className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border">
						<User className="rounded-full overflow-hidden" />
					</Avatar>
					<h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
						No User Selected
					</h2>
				</>
			)}
		</div>
	);
};

export default ActiveUser;
