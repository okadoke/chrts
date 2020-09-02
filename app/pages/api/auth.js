import * as admin from 'firebase-admin'
import jwt from 'jsonwebtoken'

if (admin.apps.length === 0) {
  const credential = JSON.parse(
    Buffer.from(process.env.firebaseAdminCredentials, 'base64').toString()
  )
  admin.initializeApp({
    credential: admin.credential.cert(credential),
  })
}

export default async (req, res) => {
  const auth_parts = req.headers.authorization.split(' ')
  if (auth_parts.length !== 2) {
    res.statusCode = 403
    res.send('Request did not contain Bearer token')
    return
  }
  const [key, idToken] = auth_parts
  if (key !== 'Bearer') {
    res.statusCode = 403
    res.send('Request did not contain Bearer token')
    return
  }
  try {
    const claims = await admin.auth().verifyIdToken(idToken)
    const user = await admin.auth().getUser(claims.uid)
    console.log('storing credentials:', req.body)
    const credentials = req.body
    const token = jwt.sign(credentials, process.env.jwtSecret)
    res.setHeader(
      'Set-Cookie',
      [`token=${token}; HttpOnly`]
    )
    res.statusCode = 200
    res.send('OK')
  }
  catch (e) {
    console.log(e)
    res.statusCode = 403
    res.send('Not allowed')
  }
}