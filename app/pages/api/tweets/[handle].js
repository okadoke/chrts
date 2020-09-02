import query from 'lib/api/twitter_query'
import validateRequest from 'lib/api/validate'

export default async function(req, res) {
  const { credentials, user } = await validateRequest(req, res)
  if (res.statusCode !== 200) {
    return
  }

  const handle = req.handle
  return query({
    url: `https://api.twitter.com/2/tweets/search/recent?query=from%3A${handle}&expansions=attachments.media_keys&media.fields=preview_image_url,type,url&tweet.fields=attachments`,
    credentials
  })
  .then(data => {
    res.statusCode = 200
    res.json(data)
  })
  .catch(error => {
    res.statusCode = 500
    res.json(error)
  })
}