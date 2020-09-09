import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const providers = [
	Providers.Twitter({
		clientId     : process.env.TWITTER_ID,
		clientSecret : process.env.TWITTER_SECRET,
	}),
]

const callbacks = {}
callbacks.redirect = async (url, baseUrl) => {
	console.log(url)
	console.log(baseUrl)
	return Promise.resolve(baseUrl + "/api/auth/callback")
}

const options = {
	providers,
	callbacks,
}

export default (req, res) => NextAuth(req, res, options)
