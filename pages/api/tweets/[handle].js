
const bearer_token = process.env.NEXT_PUBLIC_TWTR_BEARER

function fetchTweets(handle) {
  return fetch(`https://api.twitter.com/2/tweets/search/recent?query=from:${handle}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearer_token}`,
      'Content-Type': 'application/json'
    })
  })
  .then(r => r.json())
}

export default ({query}, res) => {
  return fetchTweets(query.handle)
  .then(tweets => {
    res.statusCode = 200
    res.json(tweets)
  })
  .catch(error => {
    res.statusCode = 500
    res.json(error)
  })
}