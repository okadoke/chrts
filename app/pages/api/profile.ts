import auth0 from 'lib/auth'

export default async function profile(req, res) {
  try {
    console.log('handling profile')
    await auth0.handleProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}