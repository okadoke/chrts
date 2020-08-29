import useUser from 'data/use_user'
import useSWR from 'swr'
import { useState } from 'react'

function authUser() {
  console.log('requesting token')
  return fetch('https://api.twitter.com/oauth/request_token', {
    method: 'POST',
    body: encodeURI('http://127.0.0.1/dashboard'),
  }).then((r) => r.json())
}

export default function Auth() {
  const { authState, setAuthState } = useState('signed_out')
  const { data, error } = useSWR(authState === 'signing_in' ? 'twitter_auth' : null, authUser)

  const handleClick = (event) => {
    if (authState === 'signed_out') {
      setAuthState('signing_in')
    }
  }

  return (
    <button
      className="px-3 py-2 font-bold bg-blue-500 text-white text-sm rounded-full shadow focus:outline-none hover:bg-blue-600"
      onClick={handleClick}
    >
      Connect Twitter Account
    </button>
  )
}
