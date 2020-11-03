import query from "lib/api/twitter_query"
import validateRequest from "lib/api/validate"
import { getSession } from "next-auth/client"
import jwt from "next-auth/jwt"

const secret = process.env.JWT_SECRET

export default async function (req, res) {
	const token = await jwt.getToken({ req, secret, encryption: true })
	if (token?.credentials) {
		// Signed in
		// console.log("JSON Web Token", JSON.stringify(token, null, 2))
		const handle = token.name
		return query({
			// url: `https://api.twitter.com/2/users/by/username/eje1000`,
			// url: `https://api.twitter.com/2/tweets/search/recent?query=from%3A${handle}&expansions=attachments.media_keys&media.fields=preview_image_url,type,url&tweet.fields=attachments`,
			url: `https://api.twitter.com/1.1/friends/list.json?screen_name=${handle}&skip_status=true`,
			credentials: token.credentials,
		})
			.then((friends) => {
				res.statusCode = 200
				res.json(friends)
			})
			.catch((error) => {
				// console.log("error requesting friends:", error)
				res.statusCode = 500
				res.json(error)
			})
	} else {
		res.status(401)
		res.json({ error: "Not signed in" })
	}

	// const { credentials, user } = await validateRequest(req, res)
	// if (res.statusCode !== 200) {
	//   return
	// }

	// const handle = user.displayName
	// return query({
	//   // url: `https://api.twitter.com/2/users/by/username/eje1000`,
	//   // url: `https://api.twitter.com/2/tweets/search/recent?query=from%3A${handle}&expansions=attachments.media_keys&media.fields=preview_image_url,type,url&tweet.fields=attachments`,
	//   url: `https://api.twitter.com/1.1/friends/list.json?screen_name=${handle}&skip_status=true`,
	//   credentials
	// })
	// .then(friends => {
	//   res.statusCode = 200
	//   res.json(friends)
	// })
	// .catch(error => {
	//   console.log('error requesting friends:', error)
	//   res.statusCode = 500
	//   res.json(error)
	// })
}
