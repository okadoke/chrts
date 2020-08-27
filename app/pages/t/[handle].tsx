import {useRouter} from 'next/router'
import TweetsByHandle from 'components/tweets'
type Props = {
  handle?: string
}

export default function TweetsPage() {
  console.log("Rendering Tweets page")
  const router = useRouter()
  let { handle }: Props = router.query
  if (handle && handle.startsWith('@')) {
    handle = handle.substr(1, handle.length - 1)
  }

  return <TweetsByHandle handle={handle} />
}