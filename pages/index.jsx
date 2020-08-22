import Head from 'next/head'

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>chrts.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <form className="p-2">
          <label className="text-sm text-gray-600" for="username">Enter a Twitter Username</label>
          <div className="flex">
            <input type="text" id="username" className="px-2 py-1 rounded-sm border focus:outline-none" placeholder="Username"/>
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
