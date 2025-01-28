import type React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "@heroicons/react/solid"

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-purple-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Sellenix</a>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/builder">
                <a>Builder</a>
              </Link>
            </li>
            <li>
              <Link href="/seo-tools">
                <a>SEO Tools</a>
              </Link>
            </li>
            <li>
              <Link href="/account">
                <a>Account</a>
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-purple-700 transition-colors"
        >
          {theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>
      </div>
    </header>
  )
}

export default Header

