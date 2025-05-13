import { Card } from '@/components/ui/card';
import ActiveUser from './ActiveUser';
import Chat from './Chat';
import UserSearch from './UserSearch';

export default function Home() {
	return (
		<>
			<div className="max-w-md w-full flex flex-col gap-4">
				<UserSearch />

				{/* CHAT MESSAGES */}
				<Card className="flex flex-col gap-2 p-4">
					<ActiveUser />

					<Chat />
				</Card>
			</div>
		</>
	);
}
