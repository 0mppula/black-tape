'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MESSAGES_QUERY_KEY } from '@/constants';
import useChatStore from '@/hooks/useChatStore';
import { FormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { sendMessage } from '../actions/chat';

const ChatForm = () => {
	const { activeChat } = useChatStore();
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			content: '',
		},
	});

	const { mutate, isPending: isLoading } = useMutation({
		mutationFn: async (data: z.infer<typeof FormSchema>) => {
			if (!activeChat) return;

			await sendMessage(activeChat?.id, data.content);
			form.reset();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY] });
		},
		onError: (error) => {
			toast.error('Something went wrong. Please try again later.');
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => mutate(data))}
				className="border-t pt-2 mt-2 flex gap-2"
			>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									disabled={isLoading}
									placeholder="
                Type your message..."
									type="text"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button size="icon">
					<SendHorizontal className="size-4" />
				</Button>
			</form>
		</Form>
	);
};

export default ChatForm;
