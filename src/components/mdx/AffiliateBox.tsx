interface AffiliateBoxProps {
  productName: string
  url: string
  price?: string
  badge?: string
  network: 'amazon' | 'clickbank'
  description?: string
}

export default function AffiliateBox({
  productName,
  url,
  price,
  badge,
  network,
  description,
}: AffiliateBoxProps) {
  return (
    <div className="not-prose my-8 rounded-xl border border-orange-500/30 bg-orange-500/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            {badge && (
              <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                {badge}
              </span>
            )}
            <span className="text-xs uppercase tracking-wider text-zinc-500">
              {network === 'amazon' ? 'Amazon' : 'ClickBank'}
            </span>
          </div>
          <h4 className="text-base font-semibold text-white">{productName}</h4>
          {description && (
            <p className="mt-1 text-sm text-zinc-400">{description}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          {price && (
            <span className="text-lg font-bold text-orange-400">{price}</span>
          )}
          <a
            href={url}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
          >
            Check Price
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
