"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/(dashboard)/actions";

const NAV_ITEMS = [
  { href: "/contracts", label: "Contracts" },
  { href: "/events", label: "Events" },
  { href: "/transfers", label: "Transfers" },
  { href: "/settings", label: "Settings" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 border-r border-gray-200 p-4">
      <div className="mb-6 px-3 text-lg font-bold">stellarlens</div>
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded px-3 py-2 text-sm font-medium ${
                  active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <form action={logout} className="mt-6 border-t border-gray-200 pt-4">
        <button type="submit" className="w-full rounded px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-100">
          Sign out
        </button>
      </form>
    </nav>
  );
}
