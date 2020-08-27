import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <main className="max-w-2xl mx-auto">
      <Component {...pageProps} />
    </main>
  )
}

export default App
