import Link from "next/link";
import { Fragment } from "react";

const NAV_ITEMS = [
  { label: "~", href: "/" },
  { label: "portfolio", href: "/portfolio" },
  { label: "writing", href: "/portfolio#writing" },
  { label: "resume", href: "/resume" },
] as const;

export function SiteNav() {
  return (
    <nav aria-label="Site" className="mb-4 flex justify-end">
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        {NAV_ITEMS.map((item, index) => (
          <Fragment key={item.href}>
            {index > 0 && <span className="text-gray-400">/</span>}
            <li>
              <Link
                href={item.href}
                className="hover:text-anchor transition-colors"
              >
                {item.label}
              </Link>
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
