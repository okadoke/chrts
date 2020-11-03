import useSWR from "swr"
import { Spinner } from "components/spinner"
import TweetEmbed from "./tweet_embed"

type ChartPrediction = {
	prediction?: string
	error?: string
	msg?: string
}
type UrlPrediction = {
	mediaIndex: number
	url: string
	prediction?: string
	error?: string
	msg?: string
}

function chartPredictions(tweet) {
	const promises = tweet.attachments.media.map((media, i: number) => {
		console.log("analyzing", media.url)
		return fetch(`https://chrtsio.web.app/ischart?url=${media.url}`)
			.then((r) => r.json())
			.then((r: ChartPrediction) => {
				return {
					mediaIndex: i,
					url: media.url,
					...r,
				}
			})
	})

	return Promise.all<UrlPrediction>(promises)
}

export default function TweetContainer({ tweet }) {
	// build our own key as concat of urls to be checked
	// could pass an array of key + tweet, but the same logical tweet would
	// trigger a revalidate even though urls haven't changed
	// This way, tweet object can be different, but if urls are the same, no revalidate
	const key = tweet.attachments.media.map((media) => media.url).join("")
	// we don't need to use the key because it's derived from the tweet
	let { data: predictions, error } = useSWR(key, (key) => chartPredictions(tweet), {
		revalidateOnFocus: false,
		loadingTimeout: 5000,
	})

	const handleImageClick = (urlPred: UrlPrediction) => {
		window.open(urlPred.url, "_blank")
	}

	if (error) {
		return <p>{JSON.stringify(error)}</p>
	}
	const content = () => {
		if (!predictions) {
			return (
				<div className="flex items-center">
					<Spinner size={5} />
					<p className="ml-2">Analyzing links...</p>
				</div>
			)
		}
		const anyCharts = predictions.some((urlPred: UrlPrediction) => urlPred.prediction === "chart")
		if (!anyCharts) {
			return (
				<p>
					No charts here, <a className="text-blue-500 underline cursor-pointer">load anyway...</a>
				</p>
			)
		}
		const images = () => {
			return (
				<ul>
					{predictions.map((urlPred: UrlPrediction) => {
						return (
							<li key={urlPred.mediaIndex}>
								<img src={urlPred.url} onClick={() => handleImageClick(urlPred)} className="cursor-pointer" />
							</li>
						)
					})}
				</ul>
			)
		}
		return (
			<div>
				{images()}
				<div className="pl-10">
					<TweetEmbed tweet={tweet} />
				</div>
			</div>
		)
	}
	return <div className="px-4 py-2">{content()}</div>
}
