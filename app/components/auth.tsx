import useUser from 'data/use_user'
import useSWR from 'swr'
import { useState } from 'react'

async function authUser() {
  const resp = await fetch('/api/login')
}

export default function Auth() {
  const [authState, setAuthState] = useState('signed_out')
  // const { data, error } = useSWR(authState === 'signing_in' ? 'twitter_auth' : null, authUser)

  const handleClick = async (event) => {
    if (authState === 'signed_out') {
      setAuthState('signing_in')
      const resp = await authUser()
      console.log(resp)
    }
  }

  return (
    <a
      className="px-3 py-2 font-bold bg-blue-500 text-white text-sm rounded-full shadow focus:outline-none hover:bg-blue-600"
      // onClick={handleClick}
      href="/api/login"
    >
      Connect Twitter Account
    </a>
  )
}
