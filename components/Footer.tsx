import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; 2023 Sellenix. Alle rechten voorbehouden.</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/reseller" className="hover:text-cyberpunk-pink">
                  Reseller Portal
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="hover:text-cyberpunk-pink">
                  Affiliate Programma
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

