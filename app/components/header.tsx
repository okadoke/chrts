import Link from "next/link"
import Auth from "./auth"
import { useSession } from "next-auth/client"
// import { useAuth } from 'lib/use_auth'

export default function Header() {
	const [session, loading] = useSession()

	return (
		<header className="bg-gray-300">
			<div className="flex items-center justify-between p-5">
				<p>chrts.io</p>
				<ul className="flex items-center">
					<li>
						<Link href="/">
							<a className="text-sm font-bold text-gray-700 uppercase">Home</a>
						</Link>
					</li>
					{session?.user && (
						<li className="ml-5 text-sm font-bold text-gray-700 uppercase">
							<Link href="/friends/charts">
								<a>Charts</a>
							</Link>
						</li>
					)}
					<li className="ml-5">
						<Auth />
					</li>
				</ul>
			</div>
		</header>
	)
}
