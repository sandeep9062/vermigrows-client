"use client";

import { Button } from "@/components/ui/button";
import { Leaf, Menu, ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
import CartSidebar from "./CartSidebar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import { useRouter } from "next/navigation";
// Array of navigation links for easy maintenance
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 animate-fade-in-down ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-sm"
            : "bg-background"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand Name */}
            <div className="flex-shrink-0">
              <a href="#home" className="flex items-center space-x-2">
                <Image
                  src="/vermigrows.png"
                  alt="VermiGrows"
                  width={80}
                  height={80}
                  className=""
                />
                <span className="text-2xl font-bold text-earth-brown dark:text-cream tracking-tight">
                  VermiGrows
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-8 lg:space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-soil-brown dark:text-cream/80 hover:text-rich-green dark:hover:text-leaf-green transition-colors font-medium text-sm lg:text-base hover:underline hover:underline-offset-4"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop and Mobile Icons/Buttons */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                variant="ghost"
                className="relative p-2 h-auto text-soil-brown dark:text-cream hover:bg-transparent hover:text-rich-green dark:hover:text-leaf-green transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>{" "}
              {!isAuthenticated ? (
                <button
                  onClick={() => router.push("/auth")}
                  className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                >
                  Login
                </button>
              ) : (
                <>{user && <ProfileMenu user={user} />}</>
              )}
              <Button
                className="hidden md:inline-flex bg-rich-green text-white hover:bg-leaf-green px-6 py-3 font-semibold rounded-full shadow-sm transform transition-transform hover:scale-105"
                onClick={() => {
                  const productsSection = document.getElementById("products");
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Shop Now
              </Button>
              <Button
                variant="ghost"
                className="md:hidden p-2 h-auto text-soil-brown dark:text-cream hover:bg-transparent hover:text-rich-green dark:hover:text-leaf-green transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open mobile menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-6 animate-fade-in-down"
        >
          <Button
            variant="ghost"
            className="absolute top-6 right-6 p-2 h-auto text-soil-brown dark:text-cream hover:text-rich-green dark:hover:text-leaf-green"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Close mobile menu</span>
          </Button>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl font-semibold text-soil-brown dark:text-cream hover:text-rich-green dark:hover:text-leaf-green transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
