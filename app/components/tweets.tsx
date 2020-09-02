import useSWR from 'swr'
import { Spinner } from 'components/spinner'
import TweetContainer from 'components/tweet_container'
import queryApi from 'lib/query_api'
import { useAuth } from 'lib/use_auth'

let url_regex = /(https?:\/\/[^\s]+)/

function fetchTweets(handle, user) {
  if (!handle) return null

  return queryApi(`/api/tweets/${handle}`, user)
}

function TweetList({tweets}) {
  // extract and store urls
  console.log('TweetList:', tweets)
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
    <ul className="grid grid-cols-1 gap-y-0 border border-b-0 border-gray-500">
      {filtered_tweets.map(tweet => (
        <li key={tweet.id} className="border-b border-gray-500">
          <TweetContainer tweet={tweet} />
        </li>
      ))}
    </ul>
  )
}

function TweetsByHandle({handle, className}) {
  console.log("Rendering TweetsByHandle")
  const auth = useAuth()
  let {data, error} = useSWR([handle, auth.user], fetchTweets)

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
    <div className={className}>
      {content}      
    </div>
  )
}

export default TweetsByHandle