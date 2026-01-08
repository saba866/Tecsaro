



import Link from "next/link"
import { Linkedin, Twitter, Youtube, Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border px-6 py-14 text-muted">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/downtecsarologo.png"
                alt="Tecsaro"
                className="h-20 w-auto"
              />
            </div>

            <p className="text-sm text-muted">
              Clear thinking for better business decisions.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-sm font-medium text-text mb-3">Product</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/playbook" className="hover:text-primary">Playbook</Link></li>
              <li><Link href="/case-studie" className="hover:text-primary">Case Studies</Link></li>
              <li><Link href="/tool" className="hover:text-primary">Business Tools</Link></li>
              <li><Link href="/insight" className="hover:text-primary">Insights</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-medium text-text mb-3">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary">How It Works</Link></li>
              <li><Link href="/who-its-for" className="hover:text-primary">Who it's For</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-medium text-text mb-3">Legal</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/community-guidelines" className="hover:text-primary">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-xs">
            © {new Date().getFullYear()} Tecsaro. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition">
              <Linkedin size={18} />
            </Link>
            <Link href="#" aria-label="X (Twitter)" className="hover:text-primary transition">
              <Twitter size={18} />
            </Link>
            <Link href="#" aria-label="YouTube" className="hover:text-primary transition">
              <Youtube size={18} />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-primary transition">
              <Instagram size={18} />
            </Link>
            <Link href="#" aria-label="Facebook" className="hover:text-primary transition">
              <Facebook size={18} />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}
