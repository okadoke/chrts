import useSWR from 'swr'
import { Spinner } from 'components/spinner'
import TweetEmbed from './tweet_embed'

type ChartPrediction = {
  prediction?: string
  error?: string
  msg?: string
}
type UrlPrediction = [number, ChartPrediction]

function chartPredictions(tweet) {
  const promises = tweet.attachments.media.map((media, i: number) => {
    console.log('analyzing', media.url)
    return fetch(`https://chrtsio.web.app/ischart?url=${media.url}`)
    .then(r => r.json())
    .then(r => {
      const result: UrlPrediction = [i, r as ChartPrediction]
      return result
    })
  })
  
  return Promise.all<UrlPrediction>(promises)
}

export default function TweetContainer({tweet}) {
  // build our own key as concat of urls to be checked
  // could pass an array of key + tweet, but the same logical tweet would
  // trigger a revalidate even though urls haven't changed
  // This way, tweet object can be different, but if urls are the same, no revalidate
  const key = tweet.attachments.media.map(media => media.url).join('')
  // we don't need to use the key because it's derived from the tweet
  let {data, error} = useSWR(key, key => chartPredictions(tweet), {
    revalidateOnFocus: false,
    loadingTimeout: 5000
  })
  if (error) {
    return <p>{JSON.stringify(error)}</p>
  }
  const content = () => {
    if (!data) {
      return <div className="flex items-center"><Spinner size={5} /><p className="ml-2">Analyzing links...</p></div>
    }
    const anyCharts = data.some((urlPred: UrlPrediction) => urlPred[1].prediction === 'chart')
    if (!anyCharts) {
      return <p>No charts here, <a className="underline text-blue-500 cursor-pointer">load anyway...</a></p>
    }
    const images = () => {
      return (
        <ul>
          { data.map((urlPred: UrlPrediction) => {
              return <li key={urlPred[0]}><img src={tweet.attachments.media[urlPred[0]].url} /></li>
            })
          }
        </ul>
      )
    }
    return (
      <div>
        {images()}
        <TweetEmbed tweet={tweet} />
      </div>
    )
  }
  return (
    <div className="px-4 py-2">
      {content()}
    </div>
  )
}