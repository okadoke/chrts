import TweetsByHandle from 'components/tweets'

function Friend({twUser}) {
  return (
    <div className="flex items-start">
      <img src={twUser.profile_image_url} className="h-12 w-12 rounded-full shadow" />
      {/* <p className="ml-5">{JSON.stringify(twUser)}</p> */}
      <TweetsByHandle handle={twUser.screen_name} className="ml-5"/>
    </div>
  )
}

export default function Friends({twUsers}) {
  if (!twUsers) {
    return <p>No friends were found.</p>
  }
  return (
    <ul>
      { twUsers.map(twUser => {
          return <li key={twUser.id}><Friend twUser={twUser}/></li>
        })
      }
    </ul>
  )
}