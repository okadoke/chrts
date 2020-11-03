import useSWR from 'swr'
import { useState } from 'react'
import {Spinner} from 'components/spinner'
import { useAuth } from 'lib/use_auth'

export default function Auth() {
  const auth = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => setIsOpen(!isOpen)

  if (auth.state === 'unknown') {
    return <Spinner size={5}/>
  }
  if (!auth.user) { 
    return (
      <button
        className="px-3 py-2 font-bold bg-blue-500 text-white text-sm rounded-full shadow focus:outline-none hover:bg-blue-600"
        onClick={auth.signin}
        // href="/api/login"
      >
        Connect Twitter Account
      </button>
    )
  }
  return (
    <div className="relative">
      <img src={auth.user.photoURL} onClick={toggleModal} className="w-10 h-10 rounded-full cursor-pointer" />
      { isOpen && 
        <div>
          <button onClick={toggleModal} className="fixed inset-0 h-full w-full bg-black opacity-25" />
          <div onClick={toggleModal} className="absolute right-0 mt-2 w-32 px-3 py-1 rounded bg-white shadow">
            <a onClick={auth.signout} href="#" className="block">Sign Out</a>
          </div>
        </div>
      } 
    </div>
  )
}
