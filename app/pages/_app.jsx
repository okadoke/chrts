import '../styles/globals.css'
import Header from '../components/header'
import {ProvideAuth} from 'lib/use_auth'

function App({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Header />
      <main className="max-w-2xl mx-auto">
        <Component {...pageProps} />
      </main>
    </ProvideAuth>
  )
}

export default App
