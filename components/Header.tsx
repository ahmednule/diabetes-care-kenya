import Link from "next/link"
import { Activity, ArrowRight, CheckCircle2, HeartPulse, LineChart, ShieldCheck } from "lucide-react"
import { Button } from "./ui/button"

export default function Header(){
    return(
        <div>
                  <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Activity className="h-6 w-6 text-primary" />
          <span>DiabetesCare Kenya</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      </header>
        </div>
    )
}