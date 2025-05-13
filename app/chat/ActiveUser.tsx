'use client';

import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSearchQueryStore from '@/hooks/useSearchQuery';
import { getUserInitials } from '@/lib/utils';
import { Avatar } from '@radix-ui/react-avatar';
import { User } from 'lucide-react';

const ActiveUser = () => {
	const { activeUser } = useSearchQueryStore();

	return (
		<div className="flex items-center gap-4 mb-2 border-b pb-2">
			{activeUser ? (
				<>
					<Avatar className="w-10 h-10 rounded-full border-2 border-border">
						<AvatarImage className="rounded-full" src={activeUser.image || undefined} />
						<AvatarFallback>{getUserInitials(activeUser.name || '')}</AvatarFallback>
					</Avatar>

					<h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
						{activeUser?.name || activeUser?.email || 'Select a user'}
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
