import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const TEST_CHAT_USERS = [
	{
		id: '1',
		name: 'John Doe',
		email: 'johnDoe@gmail.com',
	},
	{
		id: '2',
		name: 'Jane Doe',
		email: 'janeDoe@gmail.com',
	},
];

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

const TEST_ACTIVE_USER_ID = '1';

export default function Home() {
	return (
		<>
			<div className="max-w-md w-full flex flex-col gap-4">
				<Input className="  " type="search" placeholder="Enter your friends email..." />

				{/* CHAT MESSAGES */}
				<Card className="flex flex-col gap-2 p-4">
					<h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 border-b pb-2">
						{TEST_CHAT_USERS[1].name}
					</h2>

					<div className="flex flex-col gap-2">
						<ScrollArea className="flex flex-col gap-2 h-[calc(100vh-22rem-2px)] overflow-y-auto pr-4">
							<div className="flex-grow" />

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
									<p className="leading-7 [&:not(:first-child)]:mt-6">
										{message.message}
									</p>
								</Card>
							))}
						</ScrollArea>

						{/* CHAT FORM */}
						<form className="border-t pt-2 mt-2 flex gap-2">
							<Input
								className="w-full"
								type="text"
								placeholder="Type your message..."
							/>

							<Button>▶</Button>
						</form>
					</div>
				</Card>
			</div>
		</>
	);
}
