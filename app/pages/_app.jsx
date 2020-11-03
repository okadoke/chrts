import "../styles/globals.css"
import Header from "../components/header"
// import {ProvideAuth} from 'lib/use_auth'
import { Provider } from "next-auth/client"

function App({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Header />
			<main className="max-w-2xl mx-auto">
				<Component {...pageProps} />
			</main>
		</Provider>
	)
}

export default App
