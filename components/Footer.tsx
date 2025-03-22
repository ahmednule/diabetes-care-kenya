import Link from "next/link"
import { Activity } from "lucide-react"

export default function Footer(){
    return(
        <div>
                  <footer className="border-t bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-semibold">DiabetesCare Kenya</span>
            </div>
            <div className="flex gap-8">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 DiabetesCare Kenya. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </div>
    )
}