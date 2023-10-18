export default function AirplaneIcon({
  className,
  color = '#d6d6d6',
}: {
  className?: string
  color?: string
}) {
  return (
    <div className={className}>
      <svg
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.2 13L5.6 13L9.1 7.52631L12.95 7.52632C13.2285 7.52632 13.4955 7.41819 13.6925 7.22571C13.8894 7.03324 14 6.7722 14 6.5C14 6.2278 13.8894 5.96676 13.6925 5.77428C13.4955 5.58181 13.2285 5.47368 12.95 5.47368L9.1 5.47368L5.6 -3.67176e-07L4.2 -4.28372e-07L5.95 5.47368L2.1 5.47368L1.05 4.10526L-1.13312e-06 4.10526L0.699999 6.5L-1.34248e-06 8.89474L1.05 8.89474L2.1 7.52631L5.95 7.52631L4.2 13Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
