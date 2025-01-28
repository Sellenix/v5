import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "./ui/button"

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-cyberpunk-neon">
          Sellenix
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard" className="hover:text-cyberpunk-pink">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/website-builder" className="hover:text-cyberpunk-pink">
                Website Builder
              </Link>
            </li>
            <li>
              <Link href="/seo-tools" className="hover:text-cyberpunk-pink">
                SEO Tools
              </Link>
            </li>
          </ul>
        </nav>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}

