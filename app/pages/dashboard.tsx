import useUser from 'data/use_user'
import { useEffect } from 'react'
import { Router } from 'next/router'

export default function Dashboard() {
  const { user, loading, loggedOut, mutate } = useUser()
  useEffect(() => {
    if (loggedOut) {
      Router.replace('/')
    }
  }, [loggedOut])

  if (loggedOut) {
    return 'redirecting...'
  }

  if (loading) {
    return 'loading'
  }

  return (
    <>
    <p>Hello {user.handle}</p>
    <p>Charts your friends have posted:</p>
    </>
  )
}