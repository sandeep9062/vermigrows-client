"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      const response = await api.post("/newsletter/subscribe", { email });
      if (response.status === 201) {
        toast.success("Thank you for subscribing to our newsletter!");
        setEmail("");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.error("This email is already subscribed.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-forest-green text-white dark:bg-background">
      <div className="container mx-auto px-4 lg:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center bg-white rounded-b-2xl w-full space-x-2">
              <Image
                src="/vermigrows.png"
                alt="VermiGrows"
                width={100}
                height={100}
              />
              <span className="text-3xl font-bold text-earth-brown tracking-tight">
                VermiGrows
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Leading provider of premium organic vermicompost fertilizers.
              Growing healthier plants, naturally.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-leaf-green/20 rounded-full"
              >
                <Facebook className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-leaf-green/20 rounded-full"
              >
                <Twitter className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-leaf-green/20 rounded-full"
              >
                <Instagram className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-leaf-green/20 rounded-full"
              >
                <Youtube className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", id: "home" },
                { name: "Products", id: "products" },
                { name: "Benefits", id: "benefits" },
                { name: "About Us", id: "about" },
                { name: "Contact", id: "contact" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-leaf-green transition-colors text-lg"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-semibold mb-8">Products</h3>
            <ul className="space-y-4">
              {[
                "Premium Vermicompost",
                "Vermicompost Pellets",
                "Liquid Fertilizer",
                "Bulk Orders",
                "Organic Seeds",
                "Garden Tools",
              ].map((product) => (
                <li key={product}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-leaf-green transition-colors text-lg"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-8" id="contact">
            <h3 className="text-xl font-semibold">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-leaf-green" />
                <span className="text-gray-300 text-lg">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-leaf-green" />
                <span className="text-gray-300 text-lg">
                  info@vermigrows.com
                </span>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-leaf-green mt-1" />
                <span className="text-gray-300 text-lg">
                  123 Organic Farm Road,
                  <br />
                  Green Valley, India 560001
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Newsletter</h4>
              <p className="text-gray-300 text-md mb-4">
                Get gardening tips and exclusive offers
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full py-3 px-4"
                />
                <Button
                  onClick={handleSubscribe}
                  className="bg-leaf-green hover:bg-rich-green rounded-full px-6"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-md">
            © 2024 VermiGrows. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-300 hover:text-leaf-green text-md transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-leaf-green text-md transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
