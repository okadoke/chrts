import { useEffect } from 'react'
import { Router } from 'next/router'
import useSWR from 'swr'
import { useAuth } from 'lib/use_auth'
import Auth from 'components/auth'
import { Spinner } from 'components/spinner'
import Friends from 'components/friends'
import queryApi from 'lib/query_api'

export default function Dashboard() {
  const auth = useAuth()
  const {data, error} = useSWR(auth.state === 'signed_in' ? ['/api/tweets/friends', auth.user] : null, queryApi)

  if (auth.state === 'unknown') {
    return <Spinner />
  }
  if (!auth.user) {
    return (
      <div className="mt-20 flex flex-col justify-center items-center">
        <h1 className="max-w-xs text-xl text-center">Authorize access to your Twitter friends list to see recent charts</h1>
        <div className="mt-5 ">
          <Auth />
        </div>
      </div> 
    )
  }
  return (
    <>
    <p>Hello @{auth.user.displayName}</p>
    <p>Charts your friends have posted:</p>
    { data && <Friends twUsers={data.users} /> }
    </>
  )
}