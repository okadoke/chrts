import useSWR from "swr"
import { Spinner } from "components/spinner"
import TweetContainer from "components/tweet_container"
// import queryApi from 'lib/query_api'
// import { useAuth } from 'lib/use_auth'

let url_regex = /(https?:\/\/[^\s]+)/

function fetchTweets(handle) {
	if (!handle) return null

	return fetch(`/api/tweets/${handle}`, { method: "GET" }).then((r) => r.json())
}

function TweetList({ tweets }) {
	// extract and store urls
	console.log("TweetList:", tweets)

	let filtered_tweets = []
	if (tweets.data) {
		filtered_tweets = tweets.data
			.filter((tweet) => tweet.attachments && tweet.attachments.media_keys)
			.map((tweet) => {
				tweet.attachments.media = tweet.attachments.media_keys.map((key) =>
					tweets.includes.media.find((media) => media.media_key === key)
				)
				return tweet
			})
	}

	if (filtered_tweets.length === 0) {
		return <p>No charts here, didn't even find any tweets with images.</p>
	}
	return (
		<ul className="grid grid-cols-1 border border-b-0 border-gray-500 gap-y-0">
			{filtered_tweets.map((tweet) => (
				<li key={tweet.id} className="border-b border-gray-500">
					<TweetContainer tweet={tweet} />
				</li>
			))}
		</ul>
	)
}

function TweetsByHandle({ handle, className = "" }) {
	let { data, error } = useSWR(handle, fetchTweets)

	let content
	if (data) {
		content = <TweetList tweets={data} />
	} else {
		content = (
			<div className="flex items-center">
				<Spinner />
				<p className="ml-2 text-xl">Fetching tweets...</p>
			</div>
		)
	}

	return <div className={className}>{content}</div>
}

export default TweetsByHandle
