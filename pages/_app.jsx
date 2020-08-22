import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <main className="prose container mx-auto">
      <Component {...pageProps} />
    </main>
  )
}

export default App
