function XBigSearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="103"
      viewBox="0 0 105 103"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.011 98.1269C97.1845 100.902 92.5937 100.902 89.7638 98.1269L69.2664 78.031L74.3934 73.007L79.5169 67.9795L100.011 88.0789C102.841 90.8538 102.841 95.3555 100.011 98.1269Z"
        fill="#FFC107"
        stroke="#DC3545"
        strokeWidth="5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75.2904 38.4434C75.2904 58.0152 59.1046 73.8867 39.1452 73.8867C19.1822 73.8867 3 58.0152 3 38.4434C3 18.868 19.1822 3 39.1452 3C59.1046 3 75.2904 18.868 75.2904 38.4434Z"
        stroke="#DC3545"
        strokeWidth="5"
      />
      <path
        d="M53.3731 25.0889L25.1955 53.2666"
        stroke="#DC3545"
        strokeWidth="5"
        stroke-linecap="round"
      />
      <path
        d="M53.373 53.2665L25.1953 25.0889"
        stroke="#DC3545"
        strokeWidth="5"
        stroke-linecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.4763 62.2783L73.7762 72.1546L63.4763 62.2783Z"
        fill="white"
      />
      <path
        d="M63.4763 62.2783L73.7762 72.1546"
        stroke="#DC3545"
        strokeWidth="5"
      />
    </svg>
  )
}

export default function EmptyState() {
  return (
    <div className="w-full my-4 bg-white m-auto rounded-lg py-11 flex flex-col items-center gap-8">
      <XBigSearchIcon />
      <div className="text-center">
        <p className="my-4">
          Regrettably, we couldn't locate any available flights for your
          selected route on the specified date.
        </p>
        <p className="my-4">Select an alternate date for your travel.</p>
      </div>
    </div>
  )
}
