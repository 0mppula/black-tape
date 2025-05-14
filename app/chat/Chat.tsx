import { ScrollArea } from '@radix-ui/react-scroll-area';
import ChatBubbles from './ChatBubbles';
import ChatForm from './ChatForm';

const Chat = () => {
	return (
		<div className="flex flex-col gap-2">
			<ScrollArea className="flex flex-col gap-2 h-[calc(100vh-22rem-2px)] overflow-y-auto">
				{/* Pushes messages to the bottom */}
				<div className="flex-grow" />

				<ChatBubbles />
			</ScrollArea>

			{/* CHAT FORM */}
			<ChatForm />
		</div>
	);
};

export default Chat;
