import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { SendHorizontal } from 'lucide-react';
import ChatBubbles from './ChatBubbles';

const Chat = () => {
	return (
		<div className="flex flex-col gap-2">
			<ScrollArea className="flex flex-col gap-2 h-[calc(100vh-22rem-2px)] overflow-y-auto">
				<div className="flex-grow" />

				<ChatBubbles />
			</ScrollArea>

			{/* CHAT FORM */}
			<form className="border-t pt-2 mt-2 flex gap-2">
				<Input className="w-full" type="text" placeholder="Type your message..." />

				<Button size="icon">
					<SendHorizontal className="size-4" />
				</Button>
			</form>
		</div>
	);
};

export default Chat;
