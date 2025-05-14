import { z } from 'zod';

export const FormSchema = z.object({
	content: z.string().max(250, {
		message: 'Message must be 250 characters or less',
	}),
});
