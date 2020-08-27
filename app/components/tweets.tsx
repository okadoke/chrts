import useSWR from 'swr'
import { Spinner } from 'components/spinner'

let url_regex = /(https?:\/\/[^\s]+)/

type IsChart = {
  prediction?: string
  error?: string
  msg?: string
}

function fetchTweets(handle) {
  if (!handle) return null

  return fetch(`/api/tweets/${handle}`, {
    method: 'GET'
  })
  .then(r => r.json())
}

function hasChart(key, tweet) {
  // console.log(tweet.urls)
  const promises = tweet.attachments.media.map(media => {
    console.log('analyzing', media.url)
    return fetch(`https://chrtsio.web.app/ischart?url=${media.url}`)
    .then(r => r.json())
  })
  
  return Promise.all(promises)
  .then(results => {
    console.log(results)
    return { hasCharts: results.some((r: IsChart) => r.prediction === 'chart') }
  })
}

function Tweet({tweet}) {
  // const url_tests = tweet.urls.map(url => `https://chrtsio.web.app/ischart?url=${url}`)
  // key is combo of 'ischart' and the tweet
  let {data, error} = useSWR(['ischart', tweet], hasChart)
  if (error) {
    return <p>{JSON.stringify(error)}</p>
  }
  console.log(tweet)
  let content
  if (data) {
    content = data.hasCharts ? <img src={tweet.attachments.media[0].url} /> : ''
  }
  else {
    content = <p>Analyzing links...</p>
  }
  return (
    <li className="px-4 py-2 border rounded">
      {content}
    </li>
  )
}

function TweetList({tweets}) {
  // extract and store urls
  console.log(tweets)
  const filtered_tweets = tweets.data
    .filter(tweet => tweet.attachments && tweet.attachments.media_keys)
    .map(tweet => {
      tweet.attachments.media = tweet.attachments.media_keys.map(key => tweets.includes.media.find(media => media.media_key === key))
      return tweet
    })
  // for (let i = 0; i < tweets.data.length; i++) {
  //   let tweet = tweets.data[i]
  //   if (tweet.attachments && tweet.attachments.media_keys) {
  //     tweet.attachments.media = tweet.attachments.media_keys.map(key => tweets.includes.find(inc => inc.media_key === key))
  //   }
  // }
  return (
    <ul className="grid grid-cols-1 gap-y-4">
      {filtered_tweets.map(tweet => (
        <Tweet tweet={tweet} key={tweet.id} />
      ))}
    </ul>
  )
}

function TweetsByHandle({handle}) {
  console.log("Rendering TweetsByHandle")
  let {data, error} = useSWR(handle, fetchTweets)

  let content
  if (data) {
    content = <TweetList tweets={data} />
  }
  else {
    content = (
      <div className="flex items-center">
        <Spinner />
        <p className="ml-2 text-xl">Fetching tweets...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-black text-4xl">Tweets from {handle}</h1>
      {content}      
    </div>
  )
}

export default TweetsByHandle