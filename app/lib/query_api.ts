
export default function QueryApi(url, user) {
  return user
  .getIdToken()
  .then(idToken => {
    console.log('querying', url)
    return fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${idToken}`
      })
    })
  })
  .then(r => r.json())
}