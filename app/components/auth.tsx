import useSWR from 'swr'

function handleClick(event) {

}

export default function Auth() {
  const {data, error} = useSWR('')
  return (
    <button className="px-3 py-2 font-bold bg-blue-500 text-white text-sm rounded-full shadow focus:outline-none hover:bg-blue-600"
            onClick={handleClick}>
      Connect Twitter Account
    </button>
  )
}