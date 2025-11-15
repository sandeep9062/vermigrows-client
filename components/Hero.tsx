"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import Image from "next/image"; // Import the Image component
import heroImage from "../public/assets/hero-image.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image using next/image with a parent container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage} // Use the imported image object
          alt="Lush green garden with plants"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Overlays on top of the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-forest-green/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Floating Elements, Content, and Scroll Indicator */}
      <div className="absolute top-20 right-20 text-leaf-green/20 opacity-50">
        <Sparkles className="h-10 w-10 animate-float" />
      </div>
      <div className="absolute bottom-32 left-32 text-leaf-green/10 opacity-50">
        <Leaf
          className="h-16 w-16 animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-white">
          <div className="flex items-center justify-center space-x-3 mb-4 animate-fade-in">
            <Leaf className="h-5 w-5 text-leaf-green animate-glow" />
            <span className="text-leaf-green font-semibold tracking-wider text-sm uppercase">
              100% Organic & Eco-Friendly
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Amplify Your Garden's Potential with
            <span className="block text-leaf-green bg-gradient-to-r from-leaf-green to-rich-green bg-clip-text text-transparent mt-2">
              VermiGrows
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed animate-fade-in max-w-3xl mx-auto"
            style={{ animationDelay: "0.4s" }}
          >
            Unlock vibrant growth and lush foliage with our premium
            vermicompost.
            <span className="text-leaf-green font-semibold">
              {" "}
              3x faster growth
            </span>{" "}
            guaranteed with our scientifically proven organic formula.
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-leaf-green to-rich-green hover:from-rich-green hover:to-forest-green text-white px-8 py-6 text-lg font-bold group transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-leaf-green/30 rounded-full"
              onClick={() => scrollToSection("products")}
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white bg-black/20 hover:bg-white/20 hover:text-leaf-green hover:border-leaf-green px-8 py-6 text-lg font-bold backdrop-blur-sm transition-all duration-300 rounded-full"
              onClick={() => scrollToSection("benefits")}
            >
              Learn More
            </Button>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mt-12 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-leaf-green">50K+</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">
                Happy Gardeners
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-leaf-green">100%</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">
                Organic Certified
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-leaf-green">5-Star</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-leaf-green rounded-full mt-1.5 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
