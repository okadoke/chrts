import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const providers = [
	Providers.Twitter({
		clientId: process.env.TWITTER_ID,
		clientSecret: process.env.TWITTER_SECRET,
	}),
]

const callbacks = {}
// callbacks.redirect = async (url, baseUrl) => {
// 	console.log("redirect url:", url)
// 	console.log("base url:", baseUrl)
// 	return Promise.resolve(url)
// }
// callbacks.signIn = async function signIn(user, account, metadata) {
// 	console.log("signIn user:", user)
// 	console.log("signIn account:", account)
// 	console.log("signIn metadata:", metadata)
// }

callbacks.jwt = async (token, user, account) => {
	// console.log("jwt callback user:", user)
	// console.log("jwt callback token:", token)
	// console.log("jwt callback account:", account)
	if (user && account) {
		token.credentials = {
			accessToken: account.accessToken,
			secret: account.refreshToken,
		}
	}
	return Promise.resolve(token)
}

const events = {
	signOut: async (message) => {
		console.log(message)
	},
}

const options = {
	providers,
	callbacks,
	events,
	secret: process.env.JWT_SECRET,
	session: {
		jwt: true,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		encryption: true,
	},
}

export default (req, res) => NextAuth(req, res, options)
