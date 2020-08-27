import Head from 'next/head'
import {useRouter} from 'next/router'
import {useState} from 'react'

export default function Home() {
  const router = useRouter()
  const [handle, setHandle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    router.push({
      pathname: `/t/${handle}`
    })
  }

  function handleUsernameChange(event) {
    setHandle(event.target.value)
  }

  console.log("Rendering index.jsx")
  return (
    <div className="container mx-auto">
      <Head>
        <title>chrts.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <form className="p-2" onSubmit={handleSubmit}>
          <label className="text-sm text-gray-600" htmlFor="handle">Enter a Twitter Handle</label>
          <div className="flex">
            <input  type="text" id="handle" 
                    className="px-2 py-1 rounded-sm border focus:outline-none" 
                    placeholder="Twitter Handle"
                    onChange={handleUsernameChange}
                    aria-label='Twitter Handle'/>
            <button className="ml-2 px-2 py-1 font-bold text-sm rounded-sm border focus:outline-none bg-gray-200" type="submit">
              View Charts
            </button>
          </div>
        </form>
      </main>

      <footer className="">
      </footer>
    </div>
  )
}
