"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart, Heart, User, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart/cart-provider";
import CartDrawer from "@/components/cart/cart-drawer";

const routes = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Products" },
  { href: "/categories/clothing", label: "Clothing" },
  { href: "/categories/accessories", label: "Accessories" },
  { href: "/categories/footwear", label: "Footwear" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-950/80"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight md:text-2xl">
            STYLIQUE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Search toggle */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
              <Link href="/wishlist">
                <Heart size={20} />
              </Link>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" aria-label="Account" asChild>
              <Link href="/account">
                <User size={20} />
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant="destructive"
                >
                  {items.length}
                </Badge>
              )}
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-6 mt-8">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary",
                        pathname === route.href
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      )}
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-3 border-t mt-3 dark:border-gray-800 transition-all duration-300">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products..."
                className="pl-10 w-full focus-visible:ring-1"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Cart drawer */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}