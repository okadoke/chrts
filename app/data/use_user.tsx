import useSWR from 'swr'

async function fetchUser() {
  // invoke twitter auth  
  return {
    handle: 'Twitter Handle'
  }
}

export default function useUser() {
  const { data, mutate, error } = useSWR('twitter_user', fetchUser)

  const loading = !data && !error
  const loggedOut = error && error.status === 403

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  }
}