'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { TooltipProvider } from '../ui/tooltip';

interface NextSessionProviderProps {
	children: React.ReactNode;
}

const NextSessionProvider = ({ children }: NextSessionProviderProps) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<TooltipProvider>{children}</TooltipProvider>
				</ThemeProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
};

export default NextSessionProvider;
