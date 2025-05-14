import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';

const ChatForm = () => {
	return (
		<form className="border-t pt-2 mt-2 flex gap-2">
			<Input className="w-full" type="text" placeholder="Type your message..." />

			<Button size="icon">
				<SendHorizontal className="size-4" />
			</Button>
		</form>
	);
};

export default ChatForm;
