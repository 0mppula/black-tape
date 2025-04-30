import Link from 'next/link';
import React from 'react';

interface NavProps {}

const Nav = ({}: NavProps) => {
	return (
		<header className="sticky inset-x-0 top-0 w-full z-50 bg-card/75 border-b-2 backdrop-blur-sm">
			<div className="flex max-w-6xl items-center justify-between h-14 mx-auto px-6 md:px-8">
				<div className="">
					<Link
						href="/"
						className="gap-2 items-center justify-center flex ring-offset-background focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-ring rounded-md p-1 font-semibold"
					>
						BlackTape
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Nav;
