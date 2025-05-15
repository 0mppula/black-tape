import db from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import Github from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(db),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		Github({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
	debug: process.env.NODE_ENV === 'development',
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		jwt: async ({ token }) => {
			const db_user = await db.user.findFirst({
				where: {
					email: token?.email as string,
				},
			});

			if (db_user) {
				token.id = db_user.id;
			}

			return token;
		},
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}

			return session;
		},
	},
	pages: {
		signIn: '/',
	},
	secret: process.env.NEXTAUTH_SECRET as string,
};
