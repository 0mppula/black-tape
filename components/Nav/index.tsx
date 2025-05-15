import { getAuthSession } from '@/app/actions/auth';
import Link from 'next/link';
import ThemeToggler from './ThemeToggler';
import UserAccountNav from './UserAccountNav';

interface NavProps {}

const Nav = async ({}: NavProps) => {
	const session = await getAuthSession();

	return (
		<header className="sticky inset-x-0 top-0 w-full z-50 bg-card/75 border-b-2 backdrop-blur-sm">
			<div className="flex max-w-6xl items-center justify-between h-14 mx-auto px-6 md:px-8">
				<div>
					<Link
						href="/"
						className="gap-2 items-center justify-center flex ring-offset-background focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-ring rounded-md p-1 font-semibold"
					>
						BlackTape
					</Link>
				</div>

				<div className="flex items-center gap-2">
					<ThemeToggler />

					{session?.user ? (
						<UserAccountNav user={session.user} />
					) : (
						<></>
						// <Button asChild>
						// 	<Link href="/login">
						// 		Login <LogIn className="ml-1 h-[1.125rem] w-[1.125rem]" />
						// 	</Link>
						// </Button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Nav;
