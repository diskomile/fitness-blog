interface ProTipProps {
  children: React.ReactNode
}

export default function ProTip({ children }: ProTipProps) {
  return (
    <div className="not-prose my-6 flex gap-3 rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
      <span className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </span>
      <div className="text-sm text-zinc-300">{children}</div>
    </div>
  )
}
