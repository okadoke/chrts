import '../styles/globals.css'
import Header from '../components/header'

function App({ Component, pageProps }) {
  return (
    <div>
    <Header />
    <main className="max-w-2xl mx-auto">
      <Component {...pageProps} />
    </main>
    </div>
  )
}

export default App
