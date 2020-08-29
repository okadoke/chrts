import useUser from 'data/use_user'
import { useEffect } from 'react'
import { Router } from 'next/router'
import useSWR from 'swr'
import { Spinner } from 'components/spinner'

function fetchProfile(url) {
  return fetch(url).then(r => r.json())
}

export default function Dashboard() {

  const {data, error} = useSWR('/api/profile', fetchProfile)

  if (error) {
    return <p>{JSON.stringify(error)}</p>
  }
  if (!data) {
    return <Spinner />
  }
  console.log(data)
  return (
    <>
    <p>Hello {data.name}</p>
    <p>Charts your friends have posted:</p>
    </>
  )
}