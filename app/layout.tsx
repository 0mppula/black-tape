import Nav from '@/components/Nav';
import NextSessionProvider from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Black Tape',
	description: 'Chat security and privacy with anyone, anywhere.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<NextSessionProvider>
					<Nav />

					<main className="pt-10 lg:pt-12 flex flex-col min-h-[calc(100vh-3.5rem-2px)] max-w-6xl items-center mx-auto px-6 md:px-8 pb-32">
						{children}
					</main>

					<Toaster />
				</NextSessionProvider>
			</body>
		</html>
	);
}
