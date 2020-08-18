import {useRouter} from 'next/router'
import useSWR from 'swr'
import { Spinner } from '../components/spinner'

type Props = {
  handle?: string
}

function fetchTweets(handle) {
  if (!handle) return null

  return fetch(`/api/tweets/${handle}`, {
    method: 'GET'
  })
  .then(r => r.json())
}

function tweets() {
  return 
}
function TweetsByHandle() {
  const router = useRouter()
  let { handle }: Props = router.query
  if (handle && handle.startsWith('@')) {
    handle = handle.substr(1, handle.length - 1)
  }

  let {data, error} = useSWR(handle, fetchTweets)

  let content
  if (data) {
    content = <p>{JSON.stringify(data)}</p>
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
      <h1>Tweets from {handle}</h1>
      {content}      
    </div>
  )
}

export default TweetsByHandle