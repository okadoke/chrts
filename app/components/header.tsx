import Link from 'next/link'
import Auth from './auth'

export default function Header() {
  return (
    <header className="bg-gray-300">
      <div className="p-5 flex items-center justify-between">
        <p>chrts.io</p>
        <ul className="flex items-baseline">
          <li><Link href="/"><a>Home</a></Link></li>
          <li className="ml-2"><Auth /></li>
        </ul>
      </div>
    </header>
  )
}