
Web app to filter tweets based on which ones contain price charts. Split into a web app and a chart id api.
Web app is a statically generated nextjs app hosted on Firebase. Chart id api is a python app running in a Docker
container, hosted by Google cloud run.

The calls to the api are simple GET requests with a query parameter containing the url of an image. Responses get cached
by Firebase for the max duration (1 month).

# Web app

Source located under the /app dir.
Deploys to Vercel.

## Twitter Auth

Currently using Auth0.

- Setup domains and redirects in developer portal to point to Auth0 urls
  - App Url: https://chrts.us.auth0.com
  - Redirect Url: https://chrts.us.auth0.com/login/callback

### Links

- Developer portal: https://developer.twitter.com/en/portal/dashboard
- Nextjs + Auth0 guide: https://www.codemochi.com/blog/2020-04-01-how-to-add-auth0-nextjs

## Test locally

```
npm run dev
```

# Chart identification API

Source located under the /api dir.

## Test locally

From /api dir...

Run python directly
```
python server.py 'serve' 
```

Or test within Docker container

- build the image...
```
docker build -t chrts-api .
```

- run the container...
```
docker run --rm -it -p 5000:5000 chrts-api
```

- list running Docker containers
```
docker ps
```
- list Docker images
```
docker images
```

## Deploy to Google Cloud

Build the Docker image from the Dockerfile and push it to cloud build

```
gcloud builds submit --tag gcr.io/chrtsio/chrts-api
```
Then deploy the image
```
gcloud beta run deploy --image gcr.io/chrtsio/chrts-api --platform managed --region us-east4
```
And deploy the Firebase hosting files and config
```
firebase deploy --only hosting
```

## Test URLs

https://chrtsio.web.app/ischart?url=https://lh3.googleusercontent.com/6vGE9yq9iaakdf8pMzyVe2iXi-xDNN0yGJSr6elg3oJ_DWd4gZ4pBX8MqT4g_N1ThlKMwmUg=w640-h400-e365

https://chrtsio.web.app/ischart?url=https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/279/279359/two-eggplants-on-a-wooden-table.jpg?w=1155&h=1444

https://chrtsio.web.app/ischart?url=https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60

https://chrtsio.web.app/ischart?url=https://pbs.twimg.com/media/EgCeKrkWAAETDyg?format=jpg&name=small

https://chrtsio.web.app/ischart?url=https://pbs.twimg.com/media/Ef94MysWAAEkgDG?format=jpg&name=small