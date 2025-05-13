'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { User } from '@/generated/prisma';

import useSearchQueryStore from '@/hooks/useSearchQuery';
import { getUserInitials } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUsers } from '../actions/users';

const UserSearch = () => {
	const [internalQ, setInternalQ] = useState('');
	const [open, setOpen] = useState(false);

	const { q, setQ, activeUser, setActiveUser } = useSearchQueryStore();

	const { data, isLoading, isFetching, isError } = useQuery({
		queryKey: ['users', q],
		queryFn: () => getUsers(q),
		enabled: !!q,
	});

	useEffect(() => {
		// 300ms debounce
		const handler = setTimeout(() => {
			setQ(internalQ);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [internalQ]);

	const handleSelect = (user: User) => {
		setInternalQ(user.email!);
		setActiveUser(user);
	};

	const handleClear = () => {
		setInternalQ('');
		setActiveUser(null);
	};

	return (
		<>
			<div className="relative">
				<Input
					className="pr-10"
					type="search"
					value={(activeUser && activeUser?.name + ' ' + activeUser?.email!) || ''}
					placeholder="Search users by name or email..."
					onClick={() => setOpen(true)}
					readOnly
				/>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="z-10 absolute size-[35px] top-0 right-0"
							onClick={handleClear}
							variant="ghost"
							size="icon"
						>
							<X />
						</Button>
					</TooltipTrigger>

					<TooltipContent>
						<p>Clear</p>
					</TooltipContent>
				</Tooltip>
			</div>

			<CommandDialog open={open} onOpenChange={(state) => setOpen(state)}>
				<CommandInput
					placeholder="Search..."
					value={internalQ}
					onValueChange={setInternalQ}
				/>

				<CommandList>
					{!isError && !isLoading && !isFetching && (
						<CommandEmpty>No results found.</CommandEmpty>
					)}

					{isLoading && <CommandEmpty>Loading...</CommandEmpty>}
					{isError && <CommandEmpty>Error loading users.</CommandEmpty>}

					{data && data?.length > 0 && (
						<CommandGroup className="p-0" heading="Users">
							{data &&
								data.map((u) => (
									<CommandItem
										key={u.id}
										value={u.name + ' ' + u.email!}
										onSelect={() => {
											handleSelect(u);
											setOpen(false);
										}}
									>
										<Avatar>
											<AvatarImage src={u.image || undefined} />
											<AvatarFallback>
												{getUserInitials(u.name || '')}
											</AvatarFallback>
										</Avatar>
										{u.name} <span className="italic">({u.email})</span>
									</CommandItem>
								))}
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
};

export default UserSearch;
