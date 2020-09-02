
import firebase from 'lib/api/firebase'
import jwt from 'jsonwebtoken'

const invalid = {
  credentials: null,
  user: null
}

export default async function(req, res) {
  try {
    if (!req.headers.authorization) {
      res.statusCode = 403
      res.send('Request did not contain an Authorization header')
      return invalid
    }
    const auth_parts = req.headers.authorization.split(' ')
    if (auth_parts.length !== 2) {
      res.statusCode = 403
      res.send('Request did not contain a Bearer token')
      return invalid
    }
    const [key, idToken] = auth_parts
    if (key !== 'Bearer') {
      res.statusCode = 403
      res.send('Request did not contain a Bearer token')
      return invalid
    }
    const claims = await firebase.auth().verifyIdToken(idToken)
    if (!claims) {
      res.statusCode = 403
      res.send('Unable to verify user')
      return invalid
    }
    // console.log('id claims:', claims)

    if (!req.headers.cookie) {
      res.statusCode = 403
      res.send('Auth cookie was not sent')
      return invalid
    }
    const cookieString = req.headers.cookie.split(';').find(cookieString => cookieString.startsWith('token'))
    if (!cookieString) {
      res.statusCode = 403
      res.send('Auth token not provided')
      return invalid
    }
    const jwtToken = cookieString.split('=')[1]
    const credentials = jwt.verify(jwtToken, process.env.jwtSecret)
    if (!credentials) {
      res.statusCode = 403
      res.send('Unable to verify user\'s twitter access credentials')
      return invalid
    }

    const user = await firebase.auth().getUser(claims.uid)

    return {
      credentials,
      user
    }
  }
  catch (e) {
    res.statusCode = 500
    res.send('Error validating request: ' + e.message)
    return invalid
  }
}