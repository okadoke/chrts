import query from "lib/api/twitter_query"
import jwt from "next-auth/jwt"

const secret = process.env.JWT_SECRET

const expansions = "expansions=attachments.media_keys"
const mediaFields = "media.fields=preview_image_url,type,url,height,width"
const tweetFields = "tweet.fields=attachments,source,entities"

export default async function (req, res) {
	const token = await jwt.getToken({ req, secret, encryption: true })
	if (token?.credentials) {
		const handle = req.query.handle
		return query({
			url: `https://api.twitter.com/2/tweets/search/recent?query=from%3A${handle}&${expansions}&${mediaFields}&${tweetFields}`,
			credentials: token.credentials,
		})
			.then((data) => {
				res.statusCode = 200
				res.json(data)
			})
			.catch((error) => {
				res.statusCode = 500
				res.json(error)
			})
	} else {
		res.status(401)
		res.json({ error: "Not signed in" })
	}
}
