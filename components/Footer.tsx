import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4 text-cyberpunk-neon">Sellenix</h3>
            <p>Jouw all-in-one oplossing voor webshops, websites en SEO.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-4 text-cyberpunk-blue">Links</h4>
            <ul>
              <li className="mb-2">
                <Link href="/about">
                  <a className="hover:text-cyberpunk-pink transition-colors duration-300">Over ons</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact">
                  <a className="hover:text-cyberpunk-pink transition-colors duration-300">Contact</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/privacy">
                  <a className="hover:text-cyberpunk-pink transition-colors duration-300">Privacybeleid</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/terms">
                  <a className="hover:text-cyberpunk-pink transition-colors duration-300">Algemene voorwaarden</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-xl font-bold mb-4 text-cyberpunk-blue">Partners</h4>
            <ul>
              <li className="mb-2">
                <Link href="/resellers">
                  <a className="hover:text-cyberpunk-pink transition-colors duration-300">Reseller Portal</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/affiliate">
                  <a className="hover:text-cyberpunk-pink transition-colors duration-300">Affiliate Programma</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Sellenix. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}

