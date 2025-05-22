import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All Products" },
      { href: "/categories/clothing", label: "Clothing" },
      { href: "/categories/accessories", label: "Accessories" },
      { href: "/categories/footwear", label: "Footwear" },
      { href: "/sale", label: "Sale" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/shipping", label: "Shipping Information" },
      { href: "/returns", label: "Returns & Exchanges" },
      { href: "/size-guide", label: "Size Guide" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-muted dark:bg-gray-950 border-t dark:border-gray-800">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {/* Brand section */}
          <div className="xl:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              STYLIQUE
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Elevate your style with our curated collection of premium fashion.
            </p>
            <div className="flex mt-4 space-x-3">
              <Button variant="outline" size="icon" aria-label="Facebook">
                <Facebook size={18} />
              </Button>
              <Button variant="outline" size="icon" aria-label="Twitter">
                <Twitter size={18} />
              </Button>
              <Button variant="outline" size="icon" aria-label="Instagram">
                <Instagram size={18} />
              </Button>
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 mt-8 border-t dark:border-gray-800">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Stylique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}