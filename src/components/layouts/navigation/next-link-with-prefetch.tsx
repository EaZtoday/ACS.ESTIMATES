"use client";

import { ReactNode, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Re-export this type for convenience
export type LinkProps = React.ComponentProps<typeof Link>;

interface NextLinkWithPrefetchProps extends LinkProps {
  children: ReactNode;
  prefetchData?: () => Promise<void>;
  onNavigate?: () => void;
}

/**
 * Enhanced Next.js Link that supports data prefetching
 * Use this instead of next/link for internal navigation to avoid flashes
 */
export default function NextLinkWithPrefetch({
  children,
  prefetchData,
  onNavigate,
  ...props
}: NextLinkWithPrefetchProps) {
  const router = useRouter();

  // Handle mouse enter to prefetch both route and data
  const handleMouseEnter = useCallback(async () => {
    // Prefetch route chunk/tree
    router.prefetch(props.href.toString());

    // If we have a data prefetch function, call it
    if (prefetchData) {
      try {
        await prefetchData();
      } catch (err) {
        console.error("Error prefetching data:", err);
      }
    }
  }, [router, props.href, prefetchData]);

  // Handle click to trigger navigation callback
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onNavigate) {
        onNavigate();
      }

      // Don't prevent default - let Next.js handle the navigation
      if (props.onClick) {
        props.onClick(e);
      }
    },
    [onNavigate, props]
  );

  return (
    <Link {...props} onMouseEnter={handleMouseEnter} onClick={handleClick}>
      {children}
    </Link>
  );
}
