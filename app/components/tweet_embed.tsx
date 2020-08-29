import twitterWidget from './twitter_widget'
import {useState, useEffect, useRef} from 'react'
import {Spinner} from './spinner'

export default function TweetEmbed({tweet}) {
  const [isLoading, setIsLoading] = useState(true)
  const [err, setErr] = useState(null)
  const embedContainerEl = useRef(null)

  const embedTweet = () => {
    console.log("Embedding tweet", tweet.id)
    let script = require('scriptjs')
    script(twitterWidget, 'twitter-embed', () => {
      const win = window as any
      if (!win.twttr) {
        setIsLoading(false)
        setErr("unable to load window.twttr")
        return
      }
      win.twttr.widgets.createTweet(
        tweet.id, embedContainerEl.current, {
          cards: 'hidden'
        }
      ).then(element => {
        setIsLoading(false)
      })
    })
  }
  useEffect(embedTweet, [tweet.id])

  return (
    <div>
      {isLoading && <Spinner />}
      {err && <p>{err}</p>}
      <div ref={embedContainerEl} />
    </div>
  )
}