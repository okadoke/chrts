import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/client"
import { Spinner } from "components/spinner"

export default function Auth() {
	const [session, loading] = useSession()
	// console.log("SESSION", session)
	const [isOpen, setIsOpen] = useState(false)

	const signInClicked = () => signIn("twitter")
	const signOutClicked = () => {
		signOut({
			callbackUrl: "http://localhost:3000",
		})
	}
	const toggleModal = () => setIsOpen(!isOpen)

	if (loading) {
		return (
			<div className="flex items-center justify-center w-10 h-10 border border-gray-600 rounded-full">
				<Spinner size={5} />
			</div>
		)
	}
	if (!session) {
		return (
			<button
				className="px-3 py-2 text-sm font-bold text-white bg-blue-500 rounded-full shadow focus:outline-none hover:bg-blue-600"
				onClick={signInClicked}
			>
				Connect Twitter Account
			</button>
		)
	}
	return (
		<div className="relative">
			<img
				src={session.user.image}
				onClick={toggleModal}
				className="w-10 h-10 border-2 border-white rounded-full cursor-pointer"
			/>
			{isOpen && (
				<div>
					<button onClick={toggleModal} className="fixed inset-0 w-full h-full bg-black opacity-25" />
					<div onClick={toggleModal} className="absolute right-0 w-32 px-3 py-1 mt-2 bg-white rounded shadow">
						<a onClick={signOutClicked} href="#" className="block">
							Sign Out
						</a>
					</div>
				</div>
			)}
		</div>
	)
}
