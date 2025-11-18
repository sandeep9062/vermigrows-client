"use client";

import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
import CartSidebar from "./CartSidebar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import { useRouter } from "next/navigation";

// Navigation Links
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#products" },
  { name: "Benefits", href: "#benefits" },
  { name: "Our Process", href: "#process" },
  { name: "Testimonials", href: "#testimonials" },
];

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();

  // Sticky Header Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 dark:bg-background/60 backdrop-blur-xl shadow-sm"
            : "bg-white dark:bg-background"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2">
              <Image
                src="/vermigrows.png"
                alt="VermiGrows"
                width={60}
                height={60}
                className="mr-1"
              />
              <span className="hidden sm:inline-block text-2xl font-bold text-earth-brown dark:text-cream tracking-tight">
                VermiGrows
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-soil-brown dark:text-cream/80 hover:text-rich-green dark:hover:text-leaf-green transition-colors font-medium text-sm lg:text-base"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right section */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              <ThemeToggle />

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-soil-brown dark:text-cream hover:text-rich-green dark:hover:text-leaf-green transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Login / Profile */}
              {!isAuthenticated ? (
                <button
                  onClick={() => router.push("/auth")}
                  className="bg-rich-green hover:bg-leaf-green text-white px-4 py-2 rounded-full shadow-sm transition-all"
                >
                  Login
                </button>
              ) : (
                user && <ProfileMenu user={user} />
              )}

              {/* Shop Now (Desktop Only) */}
              <Button
                className="hidden md:inline-flex bg-rich-green text-white rounded-full px-6 py-3 font-semibold hover:bg-leaf-green shadow transition-transform hover:scale-105"
                onClick={() => {
                  const productsSection = document.getElementById("products");
                  productsSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop Now
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-soil-brown dark:text-cream"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background/95 dark:bg-background/90 backdrop-blur-2xl z-50  flex flex-col items-center justify-center space-y-6 md:hidden animate-fade-in">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-2 text-soil-brown dark:text-cream"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-semibold text-soil-brown dark:text-cream hover:text-rich-green dark:hover:text-leaf-green transition-colors"
            >
              {link.name}
            </a>
          ))}

          <Button
            className="bg-rich-green text-white px-8 py-3 rounded-full shadow-md hover:bg-leaf-green transition-colors"
            onClick={() => {
              setIsMobileMenuOpen(false);
              const productsSection = document.getElementById("products");
              productsSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop Now
          </Button>
        </div>
      )}
    </>
  );
};

export default Header;
