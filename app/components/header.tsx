import Link from 'next/link'
import Auth from './auth'
import { useAuth } from 'lib/use_auth'

export default function Header() {
  const auth = useAuth()

  return (
    <header className="bg-gray-300">
      <div className="p-5 flex items-center justify-between">
        <p>chrts.io</p>
        <ul className="flex items-center">
          <li><Link href="/"><a className="font-bold text-sm text-gray-700 uppercase">Home</a></Link></li>
          { 
          auth.user && 
          <li className="ml-5 font-bold text-sm text-gray-700 uppercase">
            <Link href="/friends/charts"><a>Charts</a></Link>
          </li> 
          }
          <li className="ml-5"><Auth /></li>
        </ul>
      </div>
    </header>
  )
}