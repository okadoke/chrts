type Props = {
  size: number,
  speed: number,
  thickness: number,
  color: string,
  gap: number,
  radius: number
}

function Spinner(props: Props) {
  
  const dash = 2 * Math.PI * props.radius * (100 - props.gap) / 100
  return (
    <svg className={`animate-spin h-${props.size} w-${props.size}`} viewBox="0 0 32 32">
      <circle
        role="presentation"
        cx="16"
        cy="16"
        r={props.radius}
        stroke={props.color}
        fill="none"
        strokeWidth={props.thickness}
        strokeDasharray={dash.toString() + ', 100'}
        strokeLinecap="round"
      />
    </svg>
  )
}

Spinner.defaultProps = {
  size: 10,
  speed: 750,
  color: 'rgba(0,0,0,0.4',
  thickness: 2,
  gap: 40,
  radius: 10
}

export { Spinner }