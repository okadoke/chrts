import { useEffect } from "react"
import { Router } from "next/router"
import useSWR from "swr"
// import { useAuth } from 'lib/use_auth'
import { useSession } from "next-auth/client"
import Auth from "components/auth"
import { Spinner } from "components/spinner"
import Friends from "components/friends"
// import queryApi from "lib/query_api"

function fetchTweets(url) {
	return fetch(url, {
		method: "GET",
	}).then((r) => r.json())
}
export default function Dashboard() {
	// const auth = useAuth()
	const [session, loading] = useSession()
	const { data, error } = useSWR(session?.user ? "/api/tweets/friends" : null, fetchTweets)

	if (error) {
		return <p>{JSON.stringify(error)}</p>
	}

	if (loading) {
		return <Spinner />
	}
	if (!session) {
		return (
			<div className="flex flex-col items-center justify-center mt-20">
				<h1 className="max-w-xs text-xl text-center">
					Authorize access to your Twitter friends list to see recent charts
				</h1>
				<div className="mt-5 ">
					<Auth />
				</div>
			</div>
		)
	}
	return (
		<>
			<p>Hello @{session.user.name}</p>
			<p>Charts your friends have posted:</p>
			{data && <Friends twUsers={data.users} />}
		</>
	)
}
