
const bearer_token = 'AAAAAAAAAAAAAAAAAAAAACsgGwEAAAAAqyesPKLAh1ylP20SjKyV87DzAMs%3DbPdoxhPtbOMXLCI4KTrfrrrgNOZtQ07iw9gNhB02lNteg7p5J7'

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