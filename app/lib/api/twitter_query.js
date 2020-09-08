import crypto from  'crypto'
import OAuth from 'oauth-1.0a'
const bearer_token = process.env.NEXT_PUBLIC_TWTR_BEARER

const oauth = OAuth({
  consumer: {
    key: process.env.twitterConsumerKey,
    secret: process.env.twitterConsumerSecret
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64')
  }
})

export default function query({url, credentials, method, useAppAuth}) {
  console.log('querying', url)
  const request_data = {
    url,
    method: method || 'GET'
  }
  const accessToken = {
    key: credentials.accessToken,
    secret: credentials.secret
  }

  // console.log('request url:', request_data.url)
  const oauthHeader = oauth.toHeader(oauth.authorize(request_data, accessToken))
  // console.log('oauthHeader:', oauthHeader)
  return fetch(request_data.url, {
    method: request_data.method,
    headers: oauthHeader
  })
  .then(r => r.json())
}