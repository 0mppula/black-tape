import AuthForm from '@/components/AuthForm';

export default function Home() {
	return (
		<div className="container flex flex-col items-center justify-center pb-[117px] py-12 min-h-[calc(100vh-69px)]">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl underline">
				Sign in to your account
			</h1>

			<AuthForm />
		</div>
	);
}
