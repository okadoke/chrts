import * as admin from 'firebase-admin'

if (admin.apps.length === 0) {
  const credential = JSON.parse(
    Buffer.from(process.env.firebaseAdminCredentials, 'base64').toString()
  )
  admin.initializeApp({
    credential: admin.credential.cert(credential),
  })
}

export default admin