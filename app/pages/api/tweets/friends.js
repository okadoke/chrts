import query from 'lib/api/twitter_query'
import validateRequest from 'lib/api/validate'

export default async function(req, res) {
  const { credentials, user } = await validateRequest(req, res)
  if (res.statusCode !== 200) {
    return
  }

  const handle = user.displayName
  return query({
    // url: `https://api.twitter.com/2/users/by/username/eje1000`,
    // url: `https://api.twitter.com/2/tweets/search/recent?query=from%3A${handle}&expansions=attachments.media_keys&media.fields=preview_image_url,type,url&tweet.fields=attachments`,
    url: `https://api.twitter.com/1.1/friends/list.json?screen_name=${handle}&skip_status=true`,
    credentials
  })
  .then(friends => {
    res.statusCode = 200
    res.json(friends)
  })
  .catch(error => {
    console.log('error requesting friends:', error)
    res.statusCode = 500
    res.json(error)
  })
}