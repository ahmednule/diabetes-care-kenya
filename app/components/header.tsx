import Link from "next/link"
import { Activity } from "lucide-react"

import { MobileSidebar } from "@/app/components/sidebar"
import { UserNav } from "@/components/user-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <MobileSidebar />
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Activity className="h-6 w-6 text-primary" />
        <span>DiabetesCare Kenya</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  )
}

