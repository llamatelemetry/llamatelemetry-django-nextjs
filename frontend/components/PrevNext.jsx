import Link from "next/link";

import { getPrevNext } from "../lib/nav";

export default function PrevNext({ currentHref }) {
  const { prev, next } = getPrevNext(currentHref);

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="prev-next">
      <div>
        {prev ? (
          <Link href={prev.href} className="prev-next-link">
            <span className="prev-next-label">Previous</span>
            <span className="prev-next-title">{prev.label}</span>
          </Link>
        ) : null}
      </div>
      <div>
        {next ? (
          <Link href={next.href} className="prev-next-link next">
            <span className="prev-next-label">Next</span>
            <span className="prev-next-title">{next.label}</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
