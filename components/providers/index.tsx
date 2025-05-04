'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';

interface NextSessionProviderProps {
	children: React.ReactNode;
}

const NextSessionProvider = ({ children }: NextSessionProviderProps) => {
	return (
		<SessionProvider>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{children}
			</ThemeProvider>
		</SessionProvider>
	);
};

export default NextSessionProvider;
