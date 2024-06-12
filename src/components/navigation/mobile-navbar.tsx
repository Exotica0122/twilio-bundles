"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "./nav-items";
import { cn } from "@/lib/utils";

export function MobileNavbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Twilio Bundles</span>
          </Link>
          <div className="mt-6">
            {NAV_ITEMS.map((navItem, i) => (
              <div key={navItem.label}>
                <h3 className="py-2">{navItem.label}</h3>
                {navItem.items.map(({ href, label, icon }) => (
                  <SheetClose key={label} asChild>
                    <Link
                      href={href}
                      className={cn(
                        "mx-[-0.65rem]  flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                        isActive(href) ? "bg-muted" : "text-muted-foreground",
                      )}
                    >
                      {icon}
                      {label}
                    </Link>
                  </SheetClose>
                ))}
                {i < NAV_ITEMS.length - 1 && (
                  <div className="my-3 w-full border-t border-neutral-300 dark:border-neutral-800" />
                )}
              </div>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
