"use client";

import Link from "next/link";
import { Package2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./nav-items";
import { cn } from "@/lib/utils";

export function NavBar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 ">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Twilio Bundles</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium">
            {NAV_ITEMS.map((navItem, i) => (
              <div key={navItem.label}>
                <h3 className="px-2 py-2">{navItem.label}</h3>
                {navItem.items.map(({ href, label, icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                      isActive(href)
                        ? "pointer-events-none bg-muted"
                        : "text-muted-foreground",
                    )}
                  >
                    {icon}
                    {label}
                  </Link>
                ))}
                {i < NAV_ITEMS.length - 1 && (
                  <div className="my-3 w-full border-t border-neutral-300 dark:border-neutral-800" />
                )}
              </div>
            ))}
          </nav>
        </div>
        <Link
          className="m-4 transition-colors hover:text-neutral-400"
          href="https://github.com/Exotica0122"
          target="_blank"
        >
          @Exotica0122
        </Link>
      </div>
    </div>
  );
}
