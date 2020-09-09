import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const providers = [
	Providers.Twitter({
		clientId: process.env.TWITTER_ID,
		clientSecret: process.env.TWITTER_SECRET,
	}),
]

const callbacks = {}
callbacks.redirect = async (url, baseUrl) => {
	console.log("redirect url:", url)
	console.log("base url:", baseUrl)
	return Promise.resolve(baseUrl.replace("localhost", "127.0.0.1"))
}

const options = {
	providers,
	callbacks,
}

export default (req, res) => NextAuth(req, res, options)
